const mongoose = require("mongoose");

const ticketDetailSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const TicketDetail = mongoose.model("TicketDetail", ticketDetailSchema);

module.exports = TicketDetail;
