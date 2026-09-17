const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes1");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
app.use("/payments", paymentRoutes);

// API Routes
app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);
app.use("/bookings", bookingRoutes);
app.use("/contacts", contactRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Server is running successfully");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
    });