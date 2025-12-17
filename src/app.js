const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const roomRoutes = require("./routes/room.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// ===== TEST ROOT =====
app.get("/", (req, res) => {
  res.send("Booking API is running");
});

// ===== CONNECT DB & START SERVER =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
