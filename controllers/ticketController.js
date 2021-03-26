const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");

// @desc GetAllTickets
// @route GET /api/ticket/getalltickets
// @access Public
const getAllTickets = asyncHandler(async (req, res) => {
    const result = await Ticket.find({})
        .populate("eventDetail", "_id price date")
        .select("user ticketNo");
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Ticket not present");
    }
});

// @desc Get all unassigned tickets
// @route GET /api/ticket/getavailabletickets
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
// @route GET /api/ticket/getbookedtickets
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

module.exports = { getAllTickets, getAvailableTickets, getBookedTickets };
