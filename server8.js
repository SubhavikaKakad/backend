const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
        console.log("Connection state:", mongoose.connection.readyState);
        console.log("Database:", mongoose.connection.name);

        const packageRoutes = require("./routes/packageRoutes");

        app.use("/api/packages", packageRoutes);

        app.get("/", (req, res) => {
            res.send("Server Working");
        });

        app.listen(3000, () => {
            console.log("Server Running on Port 3000");
        });

    } catch (error) {
        console.log("MongoDB Connection Error:");
        console.log(error);
    }
}

startServer();