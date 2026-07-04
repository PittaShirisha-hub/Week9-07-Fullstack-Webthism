const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  duration: String,
  image: String
});

module.exports = mongoose.model("Service", serviceSchema);