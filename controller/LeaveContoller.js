const StaffAvailability = require("../models/StaffAvailability");
const LeaveController = {
  updateLeave: async (req, res) => {
    try {
      const { staff, date, leaveType } = req.body;

      const leave = await StaffAvailability.findOneAndUpdate(
        { staff, date },
        { leaveType },
        { upsert: true, new: true },
      );

      res.json({
        success: true,
        leave,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
};
