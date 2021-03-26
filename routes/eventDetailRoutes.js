const express = require("express");

const router = express.Router();

const { getAllEvents } = require("../controllers/eventDetailController");

router.get("/getallevents", getAllEvents);

module.exports = router;
