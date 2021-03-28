const express = require("express");

const router = express.Router();

const {
    getAllEvents,
    getAllFutureEvents,
    getLastSevenWinners,
} = require("../controllers/eventDetailController");

router.get("/allevents", getAllEvents);
router.get("/allfutureevents", getAllFutureEvents);
router.get("/lastsevenwinners", getLastSevenWinners);

module.exports = router;
