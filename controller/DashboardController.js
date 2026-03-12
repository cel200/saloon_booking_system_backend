const Appointment = require("../models/Appointment");
const RegisterUser = require("../models/RegisterUser");
const Staff = require("../models/RegisterStaff");

const DashboardController = {
  getDashboardStats: async (req, res) => {
    try {

      const totalBookings = await Appointment.countDocuments();

      const activeUsers = await RegisterUser.countDocuments();

      const totalStaff = await Staff.countDocuments();

      const earnings = await Appointment.aggregate([
        {
          $match: { paymentStatus: "paid" }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]);

      const totalEarnings = earnings.length > 0 ? earnings[0].total : 0;

      res.status(200).json({
        success: true,
        data: {
          totalBookings,
          activeUsers,
          totalStaff,
          totalEarnings
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching dashboard data",
        error: error.message
      });
    }
  }
};

module.exports = DashboardController;