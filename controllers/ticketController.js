const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const { options } = require("../routes/ticketRoutes");

// @desc GetAllTickets
// @route GET /api/tickets/alltickets
// @access Public
const getAllTickets = asyncHandler(async (req, res) => {
    const result = await Ticket.find({})
        .populate({
            path: "eventDetail",
            select: "_id price date dateFormat",
        })
        .select("user ticketNo");

    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Ticket not present");
    }
});

// @desc Get all unassigned tickets
// @route GET /api/ticket/availabletickets
// @access Public
const getAvailableTickets = asyncHandler(async (req, res) => {
    const result = await Ticket.find({ user: null })
        .populate("eventDetail", "_id price date")
        .select("user ticketNo");
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Ticket not present");
    }
});

// @desc Get booked tickets
// @route GET /api/tickets/bookedtickets
// @access Public
const getBookedTickets = asyncHandler(async (req, res) => {
    const result = await Ticket.find({ user: { $ne: null } })
        .populate("eventDetail", "_id price date")
        .select("user ticketNo");
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Ticket not present");
    }
});

// @desc For rewards count
// @route /api/tickets/:userId?event=""
// @access Public
const modifyReward = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const event = req.query.event;

    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("No user found by this id");
    }

    if (event == "placeorder") {
        //Increse count by 4
        user.rewardCount = user.rewardCount + 4;
    } else if (event == "editorder") {
        //Increase count by 2
        user.rewardCount = user.rewardCount + 2;
    } else if (event == "cancelorder") {
        //Decrease count by 4
        user.rewardCount = user.rewardCount - 4;
    }
    await user.save();

    res.status(200);
    res.json({
        user,
    });
});

module.exports = {
    getAllTickets,
    getAvailableTickets,
    getBookedTickets,
    modifyReward,
};
