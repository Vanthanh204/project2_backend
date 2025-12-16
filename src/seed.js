require("dotenv").config();
const connectDB = require("./config/db");
const Room = require("./models/Room");
const Booking = require("./models/Booking");

const seedData = async () => {
  try {
    await connectDB();

    // XÓA TOÀN BỘ DỮ LIỆU CŨ
    await Booking.deleteMany();
    await Room.deleteMany();

    // TẠO PHÒNG MỚI
    const rooms = await Room.insertMany([
      {
        name: "Phòng 201",
        type: "Deluxe",
        price: 600000,
        capacity: 2,
        description: "Phòng đồ án 2"
      },
      {
        name: "Phòng 202",
        type: "Standard",
        price: 400000,
        capacity: 2,
        description: "Phòng tiêu chuẩn"
      }
    ]);

    console.log("✅ Reset & seed dữ liệu thành công");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
