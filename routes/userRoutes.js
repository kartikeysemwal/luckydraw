const express = require("express");

const router = express.Router();

const {
    registerUser,
    authUser,
    generateTicket,
    bookTicket,
    findWinner,
    myTickets,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", authUser);

router.post("/generateticket", protect, admin, generateTicket);
router.get("/findwinner", protect, admin, findWinner);
router.get("/bookticket/:ticketId", protect, bookTicket);
router.get("/mytickets", protect, myTickets);

module.exports = router;
