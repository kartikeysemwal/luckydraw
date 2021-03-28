const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const eventDetailRoutes = require("./routes/eventDetailRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventDetailRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("Welcome to luck draw");
    });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
