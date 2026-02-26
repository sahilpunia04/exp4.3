const { redisClient } = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const LOCK_EXPIRY = process.env.LOCK_EXPIRY || 300;

// Lock Seat
const lockSeat = async (req, res) => {
  try {
    const { seatId } = req.body;

    if (!seatId) {
      return res.status(400).json({ message: "Seat ID required" });
    }

    const lockKey = `seat:${seatId}`;
    const lockId = uuidv4();

    const result = await redisClient.set(lockKey, lockId, {
      NX: true,
      EX: LOCK_EXPIRY,
    });

    if (!result) {
      return res.status(409).json({ message: "Seat already locked" });
    }

    res.status(200).json({
      message: "Seat locked successfully",
      lockId,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Confirm Booking
const confirmSeat = async (req, res) => {
  try {
    const { seatId, lockId } = req.body;
    const lockKey = `seat:${seatId}`;

    const storedLock = await redisClient.get(lockKey);

    if (storedLock !== lockId) {
      return res.status(403).json({ message: "Invalid lock" });
    }

    await redisClient.del(lockKey);
    await redisClient.set(`booked:${seatId}`, "BOOKED");

    res.status(200).json({ message: "Seat booked successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Check Seat Status
const checkSeat = async (req, res) => {
  try {
    const { seatId } = req.params;

    const isBooked = await redisClient.get(`booked:${seatId}`);
    const isLocked = await redisClient.get(`seat:${seatId}`);

    if (isBooked) return res.json({ status: "BOOKED" });
    if (isLocked) return res.json({ status: "LOCKED" });

    res.json({ status: "AVAILABLE" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await redisClient.keys("seat:*");
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  lockSeat,
  confirmSeat,
  checkSeat
};