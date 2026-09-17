const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        razorpayOrderId: {
            type: String,
            required: true
        },

        razorpayPaymentId: {
            type: String,
            default: null
        },

        razorpaySignature: {
            type: String,
            default: null
        },

        amount: {
            type: Number,
            required: true
        },

        currency: {
            type: String,
            default: "INR"
        },

        status: {
            type: String,
            enum: ["Created", "Paid", "Failed"],
            default: "Created"
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Payment ||
    mongoose.model("Payment", paymentSchema);