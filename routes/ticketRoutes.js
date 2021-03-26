const express = require("express");

const router = express.Router();

const {
    getAllTickets,
    getAvailableTickets,
    getBookedTickets,
} = require("../controllers/ticketController");

router.get("/getalltickets", getAllTickets);
router.get("/getavailabletickets", getAvailableTickets);
router.get("/getbookedtickets", getBookedTickets);

module.exports = router;
