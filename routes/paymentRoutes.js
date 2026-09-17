const express = require("express");

const router = express.Router();

const {
    createOrder
} = require("../controllers/paymentController");

const auth = require("../middleware/auth");

// CREATE RAZORPAY ORDER
router.post("/create-order", auth, createOrder);

module.exports = router;