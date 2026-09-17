const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// CREATE RAZORPAY ORDER
exports.createOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({
                message: "Please provide bookingId"
            });
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            user: req.user.id
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const amount = booking.totalAmount;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid booking amount"
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `booking_${booking._id}`
        };

        const order = await razorpay.orders.create(options);

        const payment = await Payment.create({
            user: req.user.id,
            booking: booking._id,
            razorpayOrderId: order.id,
            amount: amount,
            currency: "INR",
            status: "Created"
        });

        res.status(201).json({
            message: "Razorpay order created successfully",
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            payment
        });

    } catch (error) {
        console.error("Razorpay Order Error:", error);

        res.status(500).json({
            message: "Failed to create Razorpay order",
            error: error.message
        });
    }
};