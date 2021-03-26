const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to luck draw");
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
