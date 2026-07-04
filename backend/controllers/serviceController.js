const Service = require("../models/Service");
const cache = require("../utils/cache");

// ======================================
// Create Service
// ======================================
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    // Clear Cache
    cache.del("services");

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Services (Cached)
// ======================================
const getServices = async (req, res) => {
  try {
    // Check Cache First
    const cachedServices = cache.get("services");

    if (cachedServices) {
      console.log("✅ Services served from cache");

      return res.status(200).json(cachedServices);
    }

    const services = await Service.find()
      .select(
        "title description price duration image"
      )
      .lean();

    // Store in Cache
    cache.set("services", services);

    console.log("✅ Services fetched from MongoDB");

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Service
// ======================================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(
      req.params.id
    )
      .select(
        "title description price duration image"
      )
      .lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Service
// ======================================
const updateService = async (req, res) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    // Clear Cache
    cache.del("services");

    res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Service
// ======================================
const deleteService = async (req, res) => {
  try {
    const service =
      await Service.findByIdAndDelete(
        req.params.id
      );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    // Clear Cache
    cache.del("services");

    res.status(200).json({
      success: true,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};