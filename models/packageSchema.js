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
            type: Object,
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
            type: Array,
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

module.exports = mongoose.model("Package", packageSchema);