const Appointment = require("../models/Appointment");

const AvailabilityController = {
  getAvailableSlots: async (req, res) => {
    try {

      const { staffId, appointmentDate } = req.body;

      const slots = [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:30 PM - 05:30 PM",
        "05:30 PM - 06:30 PM"
      ];

      const start = new Date(appointmentDate);
      start.setHours(0,0,0,0);

      const end = new Date(appointmentDate);
      end.setHours(23,59,59,999);

      const bookings = await Appointment.find({
        staff: staffId,
        appointmentDate: { $gte: start, $lte: end }
      });

      const bookedSlots = bookings.map(b => b.timeSlot);

      const availableSlots = slots.filter(
        slot => !bookedSlots.includes(slot)
      );

      res.json({
        success: true,
        availableSlots
      });

    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }
};

module.exports = AvailabilityController;