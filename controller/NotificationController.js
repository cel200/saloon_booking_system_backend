const Notification = require("../models/Notification");

const NotificationController = {

  // GET ADMIN NOTIFICATIONS
  getAdminNotifications: async (req, res) => {
    try {

      const notifications = await Notification.find({ role: "admin" })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // GET USER NOTIFICATIONS
  getUserNotifications: async (req, res) => {
    try {

      const { userId } = req.body;

      const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // GET STAFF NOTIFICATIONS
  getStaffNotifications: async (req, res) => {
    try {

      const { staffId } = req.body;

      const notifications = await Notification.find({ staff: staffId })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: notifications
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // MARK SINGLE NOTIFICATION AS READ
  markNotificationRead: async (req, res) => {
    try {

      const { id } = req.body;

      const notification = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
      );

      res.status(200).json({
        success: true,
        data: notification
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // MARK ALL NOTIFICATIONS AS READ
  markAllNotificationsRead: async (req, res) => {
    try {

      const { role, userId, staffId } = req.body;

      if (role === "admin") {
        await Notification.updateMany(
          { role: "admin", isRead: false },
          { isRead: true }
        );
      }

      if (role === "user") {
        await Notification.updateMany(
          { user: userId, isRead: false },
          { isRead: true }
        );
      }

      if (role === "staff") {
        await Notification.updateMany(
          { staff: staffId, isRead: false },
          { isRead: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Notifications marked as read"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  }

};

module.exports = NotificationController;