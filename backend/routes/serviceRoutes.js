const express = require("express");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getServices);
router.get("/:id", getServiceById);

// Protected Routes
router.post("/", verifyToken, createService);
router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

module.exports = router;