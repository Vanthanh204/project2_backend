const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

// POST add room
router.post("/", async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
});

// ✅ PUT trả phòng (ADMIN)
router.put("/:id/available", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = "available";
    await room.save();

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/rooms/:id/status
 * Đổi trạng thái phòng (admin)
 */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "available" | "booked"

    if (!["available", "booked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.status = status;
    await room.save();

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE /api/rooms/:id
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
