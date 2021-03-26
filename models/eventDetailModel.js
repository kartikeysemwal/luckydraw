const mongoose = require("mongoose");

const eventDetailModel = mongoose.Schema(
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
        dateFormat: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const EventDetail = mongoose.model("EventDetail", eventDetailModel);

module.exports = EventDetail;
