const mongoose = require("mongoose");

const StaffAvailabilitySchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterStaff",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  leaveType: {
    type: String,
    enum: ["none", "full-day", "half-day-morning", "half-day-evening"],
    default: "none",
  },

  customBreaks: [
    {
      startTime: String,
      endTime: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("StaffAvailability", StaffAvailabilitySchema);