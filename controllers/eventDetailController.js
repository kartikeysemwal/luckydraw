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

module.exports = { getAllEvents };
