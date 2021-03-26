const express = require("express");

const router = express.Router();

const {
    registerUser,
    authUser,
    generateTicket,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", authUser);

router.post("/generateticket", protect, admin, generateTicket);

module.exports = router;
