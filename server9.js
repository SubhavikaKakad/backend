const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());


async function startServer() {

    try {

        // Connect MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
        console.log("Database:", mongoose.connection.name);


        // Package routes
        const packageRoutes = require("./routes/packageRoutes");

        app.use("/api/packages", packageRoutes);


        // User routes
        const userRoutes = require("./routes/userRoutes");

        app.use("/api/users", userRoutes);


        // Home route
        app.get("/", (req, res) => {
            res.send("Server Working");
        });


        // Start server
        app.listen(3000, () => {
            console.log("Server Running on Port 3000");
        });

    } catch (error) {

        console.log("MongoDB Connection Error:");
        console.log(error);

    }
}


startServer();