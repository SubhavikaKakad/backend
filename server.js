const express = require("express");
const mongoose = require("mongoose");
const auth = require("./auth");

const app = express();

mongoose.connect("mongodb://subhavikakakad6_db_user:hQOaULvhKdgGcd4g@ac-jywosdw-shard-00-00.ywhk7un.mongodb.net:27017,ac-jywosdw-shard-00-01.ywhk7un.mongodb.net:27017,ac-jywosdw-shard-00-02.ywhk7un.mongodb.net:27017/?ssl=true&replicaSet=atlas-lzilj0-shard-0&authSource=admin&appName=Cluster7")
.then(async () => {
    console.log("Connected");

    const Student = mongoose.model("Student", {
        name: String,
        age: Number
    });

    await Student.create({
        name: "Subhavika",
        age: 20
    });

    console.log("Data inserted");
})
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});