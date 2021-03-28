const express = require("express");

const router = express.Router();

const {
    registerUser,
    authUser,
    generateEvent,
    bookTicket,
    findWinner,
    myTickets,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", authUser);

router.post("/generateevent", protect, admin, generateEvent);
router.get("/findwinner", protect, admin, findWinner);
router.get("/bookticket/:ticketId", protect, bookTicket);
router.get("/mytickets", protect, myTickets);

module.exports = router;
