const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Welcome to luck draw");
});

module.exports = app;
