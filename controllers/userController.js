const asyncHandler = require("express-async-handler");
const {
    generateToken,
    isValidDate,
    formatDate,
    generateTicketNo,
} = require("../utils/utilsFunction");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const TicketDetail = require("../models/ticketDetailModel");

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

    var ticketDetail = await TicketDetail.findOne({ date });

    if (!ticketDetail && !price) {
        res.status(400);
        throw new Error("Please enter price for this date");
    }

    if (!ticketDetail) {
        ticketDetail = await TicketDetail.create({ date, price });
    }

    for (var i = 0; i < qty; i++) {
        await Ticket.create({
            ticketNo: generateTicketNo(),
            ticketDetail: ticketDetail._id,
        });
    }

    res.status(201).json({
        ticketDetail,
    });
});

module.exports = {
    registerUser,
    authUser,
    generateTicket,
};
