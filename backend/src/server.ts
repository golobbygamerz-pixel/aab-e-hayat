import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataDir = path.join(__dirname, "../data");
const databaseFile = path.join(dataDir, "bookings.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(databaseFile)) {
  fs.writeFileSync(databaseFile, "[]");
}

function readBookings() {
  return JSON.parse(fs.readFileSync(databaseFile, "utf8"));
}

function saveBookings(bookings: unknown[]) {
  fs.writeFileSync(
    databaseFile,
    JSON.stringify(bookings, null, 2)
  );
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "AAB E-HAYAT API",
  });
});

app.get("/api/bookings", (_req, res) => {
  res.json(readBookings());
});

app.post("/api/bookings", (req, res) => {
  const {
    roomId,
    name,
    email,
    phone,
    checkIn,
    checkOut,
    guests,
  } = req.body;

  if (
    !roomId ||
    !name ||
    !email ||
    !phone ||
    !checkIn ||
    !checkOut
  ) {
    return res.status(400).json({
      message: "Please complete all booking details.",
    });
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    return res.status(400).json({
      message: "Check-out must be after check-in.",
    });
  }

  const bookings = readBookings();

  const roomAlreadyBooked = bookings.some(
    (booking: any) =>
      booking.roomId === roomId &&
      booking.status !== "cancelled" &&
      new Date(checkIn) < new Date(booking.checkOut) &&
      new Date(checkOut) > new Date(booking.checkIn)
  );

  if (roomAlreadyBooked) {
    return res.status(409).json({
      message:
        "This room is already booked for those dates.",
    });
  }

  const booking = {
    id: `AEH-${Date.now().toString().slice(-8)}`,
    roomId,
    name,
    email,
    phone,
    checkIn,
    checkOut,
    guests,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  saveBookings(bookings);

  return res.status(201).json({
    message: `Booking confirmed. Your booking ID is ${booking.id}.`,
    booking,
  });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`AAB E-HAYAT API running on port ${PORT}`);
});