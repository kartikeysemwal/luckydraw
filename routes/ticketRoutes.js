const express = require("express");

const router = express.Router();

const {
    getAllTickets,
    getAvailableTickets,
    getBookedTickets,
    modifyReward,
} = require("../controllers/ticketController");

router.get("/alltickets", getAllTickets);
router.get("/availabletickets", getAvailableTickets);
router.get("/bookedtickets", getBookedTickets);

router.post("/:userId", modifyReward);

// /api/ticket/<user_id>?event=?

module.exports = router;
