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
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
});

const Trip = mongoose.model("Trip", tripSchema);


// Test Route
app.get("/", (req, res) => {
    res.send("Trip API is Running");
});

console.log("Trip routes loaded");
// CREATE Trip (POST)
app.post("/trips", async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();

        res.status(201).json({
            message: "Trip Created Successfully",
            trip: trip
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// GET All Trips
app.get("/trips", async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// GET Single Trip
app.get("/trips/:id", async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        res.json(trip);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE Trip
app.put("/trips/:id", async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(trip);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// DELETE Trip
app.delete("/trips/:id", async (req,res)=>{
    try {
        await Trip.findByIdAndDelete(req.params.id);

        res.json({
            message:"Trip Deleted Successfully"
        });

    } catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});


// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});