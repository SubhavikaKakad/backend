const Booking = require("../models/Booking");
const Package = require("../models/packageModel");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { packageId, numberOfPeople, bookingDate } = req.body;

    if (!packageId || !numberOfPeople || !bookingDate) {
      return res.status(400).json({
        message: "Please provide packageId, numberOfPeople and bookingDate"
      });
    }

    const selectedPackage = await Package.findById(packageId);

    if (!selectedPackage) {
      return res.status(404).json({
        message: "Package not found"
      });
    }

    const totalAmount =
      selectedPackage.price * numberOfPeople;

    const booking = await Booking.create({
      user: req.user.id,
      package: packageId,
      numberOfPeople,
      bookingDate,
      totalAmount
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message
    });
  }
};


// Get My Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    })
      .populate("package")
      .populate("user", "name email");

    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message
    });
  }
};


// Get Single Booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    })
      .populate("package")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.status(200).json(booking);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error: error.message
    });
  }
};


// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Error cancelling booking",
      error: error.message
    });
  }
};