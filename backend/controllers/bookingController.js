const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

// ======================================
// Create Booking
// ======================================
const createBooking = async (req, res) => {
  try {
    console.log("========== Booking Request ==========");
    console.log(req.body);
    console.log("====================================");

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    console.log("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Bookings (Optimized)
// ======================================
const getBookings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .populate(
        "serviceId",
        "title description price duration image"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBookings = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      totalBookings,
      currentPage: page,
      totalPages: Math.ceil(totalBookings / limit),
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Booking
// ======================================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Booking Status
// ======================================
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        returnDocument: "after",
      }
    ).populate("serviceId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    console.log("Booking Status:", booking.status);

    // ======================================
    // Email & SMS Notification
    // ======================================
    if (booking.status === "Confirmed") {
      // Email
      await sendEmail(
        "pshirisha501@gmail.com",
        "Booking Confirmation",
        `
Hello,

Your booking has been confirmed successfully.

----------------------------------
Service      : ${booking.serviceId.title}
Description  : ${booking.serviceId.description}
Price        : ₹${booking.serviceId.price}
Date         : ${booking.bookingDate}
Time         : ${booking.timeSlot}
Status       : ${booking.status}
----------------------------------

Thank you for choosing our Service Booking Platform.

Have a wonderful day!
`
      );

      // SMS
      await sendSMS(
        "+919154820998",
        `Booking Confirmed!

Service: ${booking.serviceId.title}

Date: ${booking.bookingDate}

Time: ${booking.timeSlot}

Status: ${booking.status}

Thank you for choosing our Service Booking Platform.`
      );

      console.log("Email & SMS Sent Successfully");
    }

    res.status(200).json({
      success: true,
      message: "Booking Status Updated Successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  updateBookingStatus,
};