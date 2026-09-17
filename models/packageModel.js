const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        destination: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        maxGuests: {
            type: Number,
            required: true
        },

        availableSeats: {
            type: Number,
            required: true
        },

        images: {
            type: [String],
            default: []
        },

        inclusions: {
            type: [String],
            default: []
        },

        exclusions: {
            type: [String],
            default: []
        },

        itinerary: {
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Create model only if it does not already exist
module.exports =
    mongoose.models.Package ||
    mongoose.model("Package", packageSchema);