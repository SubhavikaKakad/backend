const express = require("express");
const app = express();

console.log("Hello");

app.listen(3000, () => {
    console.log("Server is running");
});