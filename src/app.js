require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));


app.get("/", (req, res) => {
  res.send("Backend Project 2 is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
