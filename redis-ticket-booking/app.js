const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const seatRoutes = require("./routes/seatRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/seats", seatRoutes);
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
module.exports = app;