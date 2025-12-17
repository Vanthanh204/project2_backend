const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/Room");

// ================== CREATE BOOKING ==================
router.post("/", async (req, res) => {
  try {
    const { customerName, roomId, checkIn, checkOut } = req.body;

    if (!customerName || !roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================== GET BOOKINGS ==================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
