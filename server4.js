const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});

// Trip Schema
const tripSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    location: String,
    duration: String
});

const Trip = mongoose.model("Trip", tripSchema);

// Insert Goa Trip
app.get("/add-trip", async (req, res) => {
    try {
        const trip = new Trip({
            title: "Goa Trip",
            description: "5N | 6D",
            price: 3000,
            image: "https://www.goa.jpg",
            location: "Goa",
            duration: "6 Days"
        });

        await trip.save();

        res.json({
            message: "Trip saved successfully!"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});