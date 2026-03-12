const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterUser"
  },

  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddService",
    required: true
  },

  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterStaff",
    required: true
  },

  appointmentDate: {
    type: Date,
    required: true
  },

  timeSlot: {
    type: String,
    required: true
  },

  bookingType: {
    type: String,
    enum: ["online", "offline"],
    default: "online"
  },
  paymentType:{
    type:String,
    enum:["online","offline"],
    default:"online"
  },
  paymentStatus:{
     type: String,
    enum: ["Pending","Completed", "Cancelled"],
    default: "Pending"
  },
  customerName: String,

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending"
  }

},
{ timestamps: true }
);

// prevent duplicate slots
AppointmentSchema.index(
  { staff: 1, appointmentDate: 1, timeSlot: 1 },
  { unique: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);