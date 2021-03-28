const express = require("express");

const router = express.Router();

const {
    getAllTickets,
    getAvailableTickets,
    getBookedTickets,
} = require("../controllers/ticketController");

router.get("/alltickets", getAllTickets);
router.get("/availabletickets", getAvailableTickets);
router.get("/bookedtickets", getBookedTickets);

module.exports = router;
