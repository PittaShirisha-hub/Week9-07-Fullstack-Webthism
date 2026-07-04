const express = require("express");

const {
  createBooking,
  getBookings,
  deleteBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create Booking
router.post("/", verifyToken, createBooking);

// Get All Bookings
router.get("/", verifyToken, getBookings);

// Delete Booking
router.delete("/:id", verifyToken, deleteBooking);

// Update Booking Status
router.put("/:id/status", verifyToken, updateBookingStatus);

module.exports = router;