const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

/**
 * POST /api/rooms
 * Tạo phòng mới
 */
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * GET /api/rooms
 * Lấy danh sách phòng
 */
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
