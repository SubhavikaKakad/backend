const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking
} = require("../controllers/bookingController");

const auth = require("../middleware/auth");

// Create booking
router.post("/", auth, createBooking);

// Get all my bookings
router.get("/", auth, getMyBookings);

// Get single booking
router.get("/:id", auth, getBookingById);

// Cancel booking
router.put("/:id/cancel", auth, cancelBooking);

module.exports = router;