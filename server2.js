const express = require("express");
const auth = require("./auth");

const app = express();

app.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Welcome to Dashboard",
        user: req.user
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
