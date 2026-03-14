const Booking = require("../models/Appointment");
const Payment = require("../models/Appointment");

const StaffDashBoardController = {
getDashboardStaffStats : async (req, res) => {
  try {

    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({
        message: "staffId is required"
      });
    }

    // Today's date range
    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Today's Sessions
    const todaysSessions = await Booking.countDocuments({
      staff: staffId,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    // Pending Requests
    const pendingRequests = await Booking.countDocuments({
      staff: staffId,
      status: "pending"
    });

    // Earned Today
    const earnings = await Payment.aggregate([
      {
        $match: {
          staff: staffId,
          status: "paid",
          createdAt: {
            $gte: today,
            $lt: tomorrow
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const earnedToday = earnings.length > 0 ? earnings[0].total : 0;

    res.status(200).json({
      todaysSessions,
      pendingRequests,
      earnedToday
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message
    });
  }
}
}
module.exports = StaffDashBoardController;