const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

console.log("SeatController:", seatController);

// Lock seat
router.post("/lock", seatController.lockSeat);

// Confirm booking
router.post("/confirm", seatController.confirmSeat);

// Check seat status
router.get("/:seatId", seatController.checkSeat);

module.exports = router;