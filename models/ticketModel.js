const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        ticketNo: {
            type: String,
            required: true,
        },
        ticketDetail: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "TicketDetail",
        },
    },
    {
        timestamps: true,
    }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
