const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const seatRoutes = require("./routes/seatRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express(); // ✅ CREATE APP FIRST

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Routes
app.use("/api/seats", seatRoutes);

// Optional root route
app.get("/", (req, res) => {
  res.send("Ticket Booking API Running");
});

// Error handler
app.use(errorHandler);

module.exports = app;