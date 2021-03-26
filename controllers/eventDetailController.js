const asyncHandler = require("express-async-handler");
const EventDetail = require("../models/eventDetailModel");

// @desc Get all events
// @route GET /api/events/getallevents
// @access Public
const getAllEvents = asyncHandler(async (req, res) => {
    const result = await EventDetail.find({});
    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error("Internal server error");
    }
});

// @desc Get all future events
// @route GET /api/events/getallfutureevents
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

//@desc Get events of last seven days
//@route GET /api/events/getlastsevenwinners
//@access Public
const getLastSevenWinners = asyncHandler(async (req, res) => {
    var date = new Date();
    date.setDate(date.getDate() - 7); // Last seven days

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

module.exports = { getAllEvents, getAllFutureEvents, getLastSevenWinners };
