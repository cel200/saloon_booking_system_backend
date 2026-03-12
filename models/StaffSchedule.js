const mongoose = require("mongoose");
const StaffScheduleSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterStaff",
    required: true
  },

  day: {
    type: String,
    enum: [
      "Sunday","Monday","Tuesday",
      "Wednesday","Thursday","Friday","Saturday"
    ],
    required: true
  },

  slots: [
    {
      startTime: String,
      endTime: String
    }
  ],

  isWorking: {
    type: Boolean,
    default: true
  }

});
module.exports = mongoose.model("StaffSchedule", StaffScheduleSchema);