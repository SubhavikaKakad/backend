const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { id: 1, name: "Subhavika" },
    "mysecretkey123",
    { expiresIn: "1h" }
);

console.log(token);