const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    console.log("Register API called");
    console.log(req.body);

    res.json({
        message: "Register API is working"
    });
});

module.exports = router;