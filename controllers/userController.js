const asyncHandler = require("express-async-handler");
const {
    generateToken,
    isValidDate,
    formatDate,
    generateTicketNo,
    formatJSDate,
} = require("../utils/utilsFunction");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const EventDetail = require("../models/eventDetailModel");

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

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password should be atleast of 6 characters");
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
// @route POST /api/users/generateevent
// @access Admin only
const generateEvent = asyncHandler(async (req, res) => {
    var { date, price, qty } = req.body;

    if (!date) {
        res.status(400);
        throw new Error("Please enter date for the ticket generation");
    }

    if (!isValidDate(date)) {
        res.status(400);
        throw new Error("Please format date as mm/dd/yyyy");
    }

    date = formatDate(date);

    var diff = new Date(date) - new Date();

    // diff = diff / 1000; // For seconds
    // console.log(diff, " in seconds");
    // diff = diff / 60; // For minutes
    // console.log(diff, " in minutes");
    // diff = diff / 60; //For hours
    // console.log(diff, " in hours");

    if (diff <= 0) {
        res.status(400);
        throw new Error("Event cannot be created for past dates");
    }

    var eventDetail = await EventDetail.findOne({ date });

    if (!eventDetail && !price) {
        res.status(400);
        throw new Error("Please enter price for this date");
    }

    if (!eventDetail) {
        eventDetail = await EventDetail.create({
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
        "_id price date dateFormat"
    );

    // Check time of booking

    var diff = ticket.eventDetail.dateFormat - new Date();

    // diff = diff / 1000; // For seconds
    // console.log(diff, " in seconds");
    // diff = diff / 60; // For minutes
    // console.log(diff, " in minutes");
    // diff = diff / 60; //For hours
    // console.log(diff, " in hours");

    if (diff <= 0) {
        res.status(400);
        throw new Error("This is an old event");
    }

    if (!ticket) {
        res.status(404);
        throw new Error("Ticket by this id not found");
    }

    if (ticket.user != null && ticket.user.equals(req.user._id)) {
        res.status(400);
        throw new Error("This is ticket is already bought by you");
    }

    if (ticket.user != null) {
        res.status(400);
        throw new Error("This ticket is already booked");
    }

    const alreadyBooked = await Ticket.findOne({
        eventDetail: ticket.eventDetail._id,
        user: req.user._id,
    });

    if (diff < 1) {
        res.status(400);
        throw new Error(
            "Ticket booking is only valid till 7:00 am. Please try in next event."
        );
    }

    if (alreadyBooked) {
        res.status(400);
        throw new Error("You have already booked ticket for this date");
    }

    ticket.user = req.user._id;

    await ticket.save();

    res.status(200).json(ticket);
});

// @desc Find winner
// @route GET /api/user/findwinner
// @access Protect and admin
const findWinner = asyncHandler(async (req, res) => {
    const cur_date = formatJSDate(new Date());

    const event = await EventDetail.findOne({ date: cur_date });

    if (!event) {
        res.status(404);
        throw new Error("No event present for today");
    }

    if (event.winner != null) {
        res.status(400);
        throw new Error("Winner is already declared");
    }

    const count = await Ticket.find({
        eventDetail: event._id,
        user: { $ne: null },
    }).countDocuments();

    if (count == 0) {
        res.status(404);
        throw new Error("No ticket bought for this event");
    }

    var random = Math.floor(Math.random() * count);

    const ticket = await Ticket.findOne({
        eventDetail: event._id,
        user: { $ne: null },
    }).skip(random);

    event.winner = ticket.user;

    await event.save();

    res.status(200).json({
        event,
        ticket,
    });

    // For two winners

    /*

    const users = await Ticket.find({
        eventDetail: event._id,
        user: { $ne: null },
    }).select("user");

    const size = users.length;

    if (size == 0) {
        res.status(404);
        throw new Error("No ticket bought for this event");
    }

    var random1 = Math.floor(Math.random() * size);

    // const ticket1 = await Ticket.findOne({
    //     eventDetail: event._id,
    //     user: { $ne: null },
    // }).skip(random);

    event.winner = users[random1].user;
    await event.save();

    const winner1 = users[random1].user;

    if (size == 1) {
        console.log(winner1);
        res.status(200).json({
            event,
            // ticket,
        });
    } else {
        var random2 = Math.floor(Math.random() * size);
        while (random2 != random1) {
            random2 = Math.floor(Math.random() * size);
        }
        const winner2 = users[random2].user;
        console.log(winner1, winner2);
    }
    */
});

// @desc Get tickets booked by user
// @route Get /api/users/mytickets
// @access Protected
const myTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({ user: req.user._id }).populate(
        "eventDetail"
    );
    res.status(200).json(tickets);
});

module.exports = {
    registerUser,
    authUser,
    generateEvent,
    bookTicket,
    findWinner,
    myTickets,
};
