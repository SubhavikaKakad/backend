const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://subhavikakakad6_db_user:hQOaULvhKdgGcd4g@ac-jywosdw-shard-00-00.ywhk7un.mongodb.net:27017,ac-jywosdw-shard-00-01.ywhk7un.mongodb.net:27017,ac-jywosdw-shard-00-02.ywhk7un.mongodb.net:27017/?ssl=true&replicaSet=atlas-lzilj0-shard-0&authSource=admin&appName=Cluster7")
.then(() => {
    console.log("Connected");

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend is working!");
});