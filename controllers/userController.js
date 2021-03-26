const asyncHandler = require("express-async-handler");
const {
    generateToken,
    isValidDate,
    formatDate,
    generateTicketNo,
} = require("../utils/utilsFunction");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const eventDetailModel = require("../models/eventDetailModel");

// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc Protect and admin
// @route POST /api/users/generateticket
// @access Admin only
const generateTicket = asyncHandler(async (req, res) => {
    var { date, price, qty = 10 } = req.body;

    if (!date) {
        res.status(400);
        throw new Error("Please enter date for the ticket generation");
    }

    if (!isValidDate(date)) {
        res.status(400);
        throw new Error("Please format date as mm/dd/yyyy");
    }

    date = formatDate(date);

    var eventDetail = await eventDetailModel.findOne({ date });

    if (!eventDetail && !price) {
        res.status(400);
        throw new Error("Please enter price for this date");
    }

    if (!eventDetail) {
        eventDetail = await eventDetailModel.create({
            date,
            price,
            dateFormat: new Date(date),
        });
    }

    for (var i = 0; i < qty; i++) {
        await Ticket.create({
            ticketNo: generateTicketNo(),
            eventDetail: eventDetail._id,
        });
    }

    res.status(201).json({
        eventDetail,
    });
});

// @desc Book ticket
// @route POST /api/users/bookticket/:tickedId
// @access Protect user
const bookTicket = asyncHandler(async (req, res) => {
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId).populate(
        "eventDetail",
        "_id price date"
    );

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket by this id not found");
    }

    if (ticket.user != null) {
        res.status(404);
        throw new Error("This ticket is already booked");
    }

    const alreadyBooked = await Ticket.findOne({
        eventDetail: ticket.eventDetail._id,
        user: req.user._id,
    });

    if (alreadyBooked) {
        res.status(400);
        throw new Error("You have already booked ticket for this date");
    }

    ticket.user = req.user._id;

    await ticket.save();

    res.status(200).json(ticket);
});

module.exports = {
    registerUser,
    authUser,
    generateTicket,
    bookTicket,
};
