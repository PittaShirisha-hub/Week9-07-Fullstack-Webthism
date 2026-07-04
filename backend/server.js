const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// ================================
// Security Middleware
// ================================

// Secure HTTP Headers
app.use(helmet());


// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
    ],
    credentials: true,
  })
);

// JSON Parser
app.use(express.json());

// ================================
// Home Route
// ================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Service Booking Platform API Running Successfully",
  });
});

// ================================
// API Routes
// ================================
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// ================================
// MongoDB Connection
// ================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "✅ MongoDB Connected Successfully"
    );
  })
  .catch((error) => {
    console.log(
      "❌ MongoDB Connection Error"
    );
    console.log(error.message);
  });

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================================
// Start Server
// ================================
const PORT = process.env.PORT || 5000;

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS
);

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});