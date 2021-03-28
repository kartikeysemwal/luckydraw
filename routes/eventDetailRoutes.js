const express = require("express");

const router = express.Router();

const {
    getAllEvents,
    getAllFutureEvents,
    getLastWinners,
} = require("../controllers/eventDetailController");

router.get("/allevents", getAllEvents);
router.get("/futureevents", getAllFutureEvents);
router.get("/lastwinners", getLastWinners);

module.exports = router;
