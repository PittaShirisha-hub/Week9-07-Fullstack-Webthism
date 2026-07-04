const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId:String,
    message:String,
    isRead:Boolean
});

module.exports = mongoose.model("Notification", notificationSchema);