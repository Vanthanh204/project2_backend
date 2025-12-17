const Booking = require("../models/Booking");
const Room = require("../models/Room");

// GET all bookings (admin)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Get bookings failed" });
  }
};

// CREATE booking (user)
exports.createBooking = async (req, res) => {
  try {
    const { customerName, roomId, checkIn, checkOut } = req.body;

    const room = await Room.findById(roomId);
    if (!room || room.status === "booked") {
      return res.status(400).json({ message: "Room not available" });
    }

    const booking = await Booking.create({
      customerName,
      room: roomId,
      checkIn,
      checkOut
    });

    // 👉 ĐÁNH DẤU PHÒNG ĐÃ ĐƯỢC ĐẶT
    room.status = "booked";
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Create booking failed" });
  }
};

// ❌ DELETE booking (admin cancel)
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 👉 TRẢ PHÒNG VỀ AVAILABLE
    const room = await Room.findById(booking.room);
    if (room) {
      room.status = "available";
      await room.save();
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled, room is available again"
    });
  } catch (err) {
    res.status(500).json({ message: "Cancel booking failed" });
  }
};
