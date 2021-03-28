const asyncHandler = require("express-async-handler");
const EventDetail = require("../models/eventDetailModel");

// @desc Get all events
// @route GET /api/events/allevents
// @access Public
const getAllEvents = asyncHandler(async (req, res) => {
    const result = await EventDetail.find({}).populate("winner", "name");
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Internal server error");
    }
});

// @desc Get all future events
// @route GET /api/events/futureevents
// @access Public
const getAllFutureEvents = asyncHandler(async (req, res) => {
    const result = await EventDetail.find({
        dateFormat: { $gte: new Date().toISOString() },
    });
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Internal server error");
    }
});

//@desc Get events of last winner
//@route GET /api/events/lastwinners
//@access Public
const getLastWinners = asyncHandler(async (req, res) => {
    var days = 7; // Last sevent days

    var date = new Date();
    date.setDate(date.getDate() - days);

    date = new Date(date);

    const result = await EventDetail.find({
        dateFormat: { $lt: new Date(), $gt: date },
    }).populate("winner", "name");

    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Internal server error");
    }
});

module.exports = { getAllEvents, getAllFutureEvents, getLastWinners };
