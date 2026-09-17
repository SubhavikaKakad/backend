const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Import Routes
const studentRoutes = require("./routes/studentRoutes");

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Student Routes
app.use("/students", studentRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});