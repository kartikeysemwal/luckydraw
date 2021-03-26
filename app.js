const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to luck draw");
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
