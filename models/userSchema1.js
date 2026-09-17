const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        mobile_number: {
            type: Number,
            required: true,
            unique: true
        },

        age: {
            type: Number
        },

        roll_number: {
            type: Number,
            required: true,
            unique: true
        },

        address: {
            type: String
        },

        course: {
            type: String
        },

        isVerified: {
            type: Boolean,
            default: true
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

module.exports =
    mongoose.models.User || mongoose.model("User", userSchema);