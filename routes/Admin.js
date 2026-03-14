const express = require("express");
const LoginUserController = require("../controller/LoginUserController");
const RegisterUserController = require("../controller/RegisterUserController");
const RegisterStaffController = require("../controller/RegisterStaffController");
const AddServiceController = require("../controller/AddServiceController");
const { updateSettings, getSaloon } = require("../controller/settingsController");
const { sendOTP, verifyOTP } = require("../controller/mobileotpService");
const { sendOtpEmail, verifyOtpEmail } = require("../controller/otpContoller");
const LoginController = require("../controller/LoginController");
const SectionController = require("../controller/SectionController");
const upload = require("../middleware/uploads");
const AppointmentController = require("../controller/AppointmentController");
const AvailabilityController = require("../controller/AvailabilityController");
const DashboardController = require("../controller/DashboardController");
const NotificationController = require("../controller/NotificationController");
const paymentController = require("../controller/paymentController");
const StaffDashBoardController = require("../controller/StaffDashBoardController");

const Admin = express.Router();

Admin.post("/login", LoginController.login);
Admin.post("/registerUser", RegisterUserController.registerUser);
Admin.get("/getUser", RegisterUserController.getAllUsers);
Admin.post("/registerStaff", RegisterStaffController.registerStaff);
Admin.post("/getStaff", RegisterStaffController.getAllStaffs);
Admin.post("/addService",upload.single("image"),AddServiceController.addService)
Admin.post("/listService",AddServiceController.listService);
Admin.post("/updateService",AddServiceController.updateService);
Admin.put("/updateStaff",RegisterStaffController.updateStaff);
Admin.delete("/deleteStaff",RegisterStaffController.deleteStaff);
Admin.delete("/deleteService",AddServiceController.deleteService);
Admin.put("/updateSettings",updateSettings);
Admin.get("/getSaloonDetails",getSaloon);
Admin.post("/send-otp", sendOTP);
Admin.post("/verify-otp", verifyOTP);
Admin.post("/send-otp-email", sendOtpEmail);
Admin.post("/verify-otp-email", verifyOtpEmail);
Admin.post("/user-login", LoginUserController.login);
Admin.post("/gender", SectionController.getSectionsByGender);
Admin.post("/add-section", SectionController.addSection);
Admin.get("/listSection", SectionController.getSection);
Admin.post("/book-appointment", AppointmentController.bookAppointment);
Admin.get("/get-appointment", AppointmentController.getAppointments);
Admin.post("/get-appointment-staff", AppointmentController.getAppointmentsByStaff);
Admin.post("/get-available-slots",AvailabilityController.getAvailableSlots)
Admin.post("/update-status",AppointmentController.updateAppointmentStatus)
Admin.post("/offline-book", AppointmentController.createOfflineAppointment);
Admin.get("/dashboard", DashboardController.getDashboardStats);
Admin.post("/admin-notification", NotificationController.getAdminNotifications);

Admin.post("/user", NotificationController.getUserNotifications);

Admin.post("/staff", NotificationController.getStaffNotifications);

Admin.post("/read", NotificationController.markNotificationRead);

Admin.post("/read-all", NotificationController.markAllNotificationsRead);
Admin.post("/create-payment-intent", paymentController.createPaymentIntent);
Admin.post("/staffdashboard",StaffDashBoardController.getDashboardStaffStats)
module.exports = Admin; // ✅ REQUIRED
