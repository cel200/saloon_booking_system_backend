// const Appointment = require("../models/Appointment");

// const AppointmentController = {

//   bookAppointment: async (req, res) => {
//     try {

//       const { user, service, staff, appointmentDate, timeSlot } = req.body;

//       const appointment = new Appointment({
//         user,
//         service,
//         staff,
//         appointmentDate,
//         timeSlot
//       });

//       await appointment.save();
//        io.to("adminRoom").emit("newAppointment", {
//       message: `New appointment booked from ${user.fullName}`,
//       data: appointment
//     });
//     io.to(`staff_${appointment.staff}`).emit("staffAppointment", {
//   message: `New appointment from ${appointment.user.fullNamer} assigned to you`,
//   data: appointment
// });
//       res.status(201).json({
//         success: true,
//         message: "Appointment booked successfully",
//         data: appointment
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: "Failed to book appointment",
//         error: error.message
//       });

//     }
//   },
//   getAppointments: async (req, res) => {
//   try {

//     const appointments = await Appointment.find()
//       .populate("user")
//       .populate("service")
//       .populate("staff");

//     res.status(200).json({
//       success: true,
//       data: appointments
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }
// },
// getAppointmentsByStaff: async (req, res) => {
//   try {

//     const { id } = req.body;

//     const appointments = await Appointment.find({ staff: id })
//       .populate("user")
//       .populate("service")
//       .populate("staff");

//     res.status(200).json({
//       success: true,
//       data: appointments
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }
// },
// updateAppointmentStatus: async (req, res) => {
//   const { id, status } = req.body;

//   try {

//     const update = await Appointment.findByIdAndUpdate(
//       id,
//       { status: status },
//       { new: true }
//     )
//       .populate("user")
//       .populate("service")
//       .populate("staff");

//     if (!update) {
//       return res.status(404).json({
//         success: false,
//         message: "Appointment not found"
//       });
//     }

//     // send response
//     res.status(200).json({
//       success: true,
//       data: update
//     });

//     // admin notification
//     io.to("adminRoom").emit("appointmentStatusUpdated", {
//       message: `Staff updated appointment status of ${update.user.fullName} to ${status}`,
//       data: update
//     });

//     // specific user notification
//     io.to(`user_${update.user.id}`).emit("appointmentStatusUpdated", {
//       message: `Your appointment status updated to ${status}`,
//       data: update
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       error: error.message
//     });

//   }
// },
//  createOfflineAppointment: async (req, res) => {
//     try {

//       const { staffId, serviceId, appointmentDate, timeSlot, customerName } = req.body;

//       const existing = await Appointment.findOne({
//         staff: staffId,
//         appointmentDate,
//         timeSlot
//       });

//       if (existing) {
//         return res.status(400).json({
//           success: false,
//           message: "Slot already booked"
//         });
//       }

//       const appointment = await Appointment.create({
//         staff: staffId,
//         service: serviceId,
//         appointmentDate,
//         timeSlot,
//         customerName,
//         bookingType: "offline"
//       });
//         io.to("adminRoom").emit("newAppointment", {
//       message: "New appointment booked",
//       data: appointment
//     });
//       res.status(201).json({
//         success: true,
//         message: "Offline appointment booked",
//         data: appointment
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         error: error.message
//       });

//     }
//   }
// };

// module.exports = AppointmentController;

const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

const AppointmentController = {

  // BOOK APPOINTMENT
  bookAppointment: async (req, res) => {
    try {

      const { user, service, staff, appointmentDate, timeSlot,paymentStatus } = req.body;

      const appointment = new Appointment({
        user,
        service,
        staff,
        appointmentDate,
        timeSlot,
        paymentStatus
      });

      await appointment.save();

      await appointment.populate("user");
      await appointment.populate("service");
      await appointment.populate("staff");

      // SAVE ADMIN NOTIFICATION
      await Notification.create({
        role: "admin",
        message: `New appointment booked by ${appointment.user.fullName}`
      });

      // SAVE STAFF NOTIFICATION
      await Notification.create({
        staff: appointment.staff._id,
        role: "staff",
        message: `New appointment assigned to you from ${appointment.user.fullName}`
      });

      // SOCKET ADMIN
      io.to("adminRoom").emit("newAppointment", {
        message: `New appointment booked from ${appointment.user.fullName}`,
        data: appointment
      });

      // SOCKET STAFF
      io.to(`staff_${appointment.staff._id}`).emit("staffAppointment", {
        message: `New appointment from ${appointment.user.fullName} assigned to you`,
        data: appointment
      });

      res.status(201).json({
        success: true,
        message: "Appointment booked successfully",
        data: appointment
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Failed to book appointment",
        error: error.message
      });

    }
  },


  // GET ALL APPOINTMENTS (ADMIN)
  getAppointments: async (req, res) => {
  try {
    const { id } = req.body; // better than body

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const appointments = await Appointment.find({ user:id })
      .populate("user")
      .populate("service")
      .populate("staff");

    res.status(200).json({
      success: true,
      data: appointments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
},


  // GET STAFF APPOINTMENTS
  getAppointmentsByStaff: async (req, res) => {
    try {

      const { id } = req.body;

      const appointments = await Appointment.find({ staff: id })
        .populate("user")
        .populate("service")
        .populate("staff");

      res.status(200).json({
        success: true,
        data: appointments
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // UPDATE APPOINTMENT STATUS
  updateAppointmentStatus: async (req, res) => {

    const { id, status } = req.body;

    try {

      const update = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )
        .populate("user")
        .populate("service")
        .populate("staff");

      if (!update) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found"
        });
      }

      // SAVE USER NOTIFICATION
      await Notification.create({
        user: update.user._id,
        role: "user",
        message: `Your appointment status updated to ${status}`
      });

      // SAVE ADMIN NOTIFICATION
      await Notification.create({
        role: "admin",
        message: `Staff updated appointment status of ${update.user.fullName} to ${status}`
      });

      // SOCKET ADMIN
      io.to("adminRoom").emit("appointmentStatusUpdated", {
        message: `Staff updated appointment status of ${update.user.fullName} to ${status}`,
        data: update
      });

      // SOCKET USER
      io.to(`user_${update.user._id}`).emit("appointmentStatusUpdated", {
        message: `Your appointment status updated to ${status}`,
        data: update
      });

      res.status(200).json({
        success: true,
        data: update
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  },


  // CREATE OFFLINE APPOINTMENT
  createOfflineAppointment: async (req, res) => {
    try {

      const { staffId, serviceId, appointmentDate, timeSlot, customerName } = req.body;

      const existing = await Appointment.findOne({
        staff: staffId,
        appointmentDate,
        timeSlot
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Slot already booked"
        });
      }

      const appointment = await Appointment.create({
        staff: staffId,
        service: serviceId,
        appointmentDate,
        timeSlot,
        customerName,
        bookingType: "offline"
      });

      // SAVE ADMIN NOTIFICATION
      await Notification.create({
        role: "admin",
        message: `Offline appointment booked for ${customerName}`
      });

      // SOCKET ADMIN
      io.to("adminRoom").emit("newAppointment", {
        message: `Offline appointment booked for ${customerName}`,
        data: appointment
      });

      res.status(201).json({
        success: true,
        message: "Offline appointment booked",
        data: appointment
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }
  }

};

module.exports = AppointmentController;