const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/Room");

/**
 * POST /api/bookings
 * Đặt phòng
 */
router.post("/", async (req, res) => {
  try {
    const { customerName, roomId, checkIn, checkOut } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.status === "booked") {
      return res.status(400).json({ message: "Room already booked" });
    }

    const booking = await Booking.create({
      customerName,
      room: roomId,
      checkIn,
      checkOut
    });

    room.status = "booked";
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/bookings
 * Lấy danh sách booking
 */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
