const express = require("express");
const router = express.Router();

const {
  lockSeat,
  confirmSeat,
  checkSeat,
  getAllSeats
} = require("../controllers/seatController");

// Lock seat
router.post("/lock", lockSeat);

// Confirm booking
router.post("/confirm", confirmSeat);

// Check single seat
router.get("/:seatId", checkSeat);

// Get all seats
router.get("/", getAllSeats);

module.exports = router;