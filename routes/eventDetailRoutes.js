const express = require("express");

const router = express.Router();

const {
    getAllEvents,
    getAllFutureEvents,
    getLastSevenWinners,
} = require("../controllers/eventDetailController");

router.get("/getallevents", getAllEvents);
router.get("/getallfutureevents", getAllFutureEvents);
router.get("/getlastsevenwinners", getLastSevenWinners);

module.exports = router;
