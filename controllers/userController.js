const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================
// REGISTER USER
// =====================================
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            mobile_number,
            role
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile_number,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile_number: user.mobile_number,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Register Error:", error);

        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};


// =====================================
// LOGIN USER
// =====================================
const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile_number: user.mobile_number,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Login Error:", error);

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};


// =====================================
// GET ALL USERS
// =====================================
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            users: users
        });

    } catch (error) {
        console.log("Get Users Error:", error);

        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};


// =====================================
// GET USER BY ID
// =====================================
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user: user
        });

    } catch (error) {
        console.log("Get User Error:", error);

        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
};


// =====================================
// UPDATE USER
// =====================================
const updateUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            mobile_number,
            role
        } = req.body;

        const updateData = {};

        if (name) {
            updateData.name = name;
        }

        if (email) {
            updateData.email = email;
        }

        if (mobile_number) {
            updateData.mobile_number = mobile_number;
        }

        if (role) {
            updateData.role = role;
        }

        // Hash new password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });

    } catch (error) {
        console.log("Update User Error:", error);

        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};


// =====================================
// DELETE USER
// =====================================
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.log("Delete User Error:", error);

        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};


// =====================================
// EXPORT CONTROLLERS
// =====================================
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};