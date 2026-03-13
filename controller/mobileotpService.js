// const client = require("../config/twillioClient");

// // Send OTP Controller
// exports.sendOTP = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number is required",
//       });
//     }

//     const response = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SERVICE_SID)
//       .verifications.create({
//         to: phone,
//         channel: "sms",
//       });

//     res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       sid: response.sid,
//     });
//   } catch (error) {
//     console.error("Send OTP Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Verify OTP Controller
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { phone, code } = req.body;

//     if (!phone || !code) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone and OTP code are required",
//       });
//     }

//     const response = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SERVICE_SID)
//       .verificationChecks.create({
//         to: phone,
//         code: code,
//       });

//     if (response.status === "approved") {
//       return res.status(200).json({
//         success: true,
//         message: "OTP verified successfully",
//       });
//     }

//     res.status(400).json({
//       success: false,
//       message: "Invalid OTP",
//     });
//   } catch (error) {
//     console.error("Verify OTP Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const client = require("../config/twillioClient");
const RegisterUser = require("../models/RegisterUser");
const RegisterStaff = require("../models/RegisterStaff");

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { phone, portal } = req.body;

    if (!phone || !portal) {
      return res.status(400).json({
        success: false,
        message: "Phone and portal type are required",
      });
    }

    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      sid: response.sid,
    });

  } catch (error) {
    console.error("Send OTP Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, code, portal } = req.body;

    if (!phone || !code || !portal) {
      return res.status(400).json({
        success: false,
        message: "Phone, OTP and portal type required",
      });
    }

    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code: code,
      });

    if (response.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    let user;

    // USER PORTAL
    // if (portal === "user") {
    //   user = await RegisterUser.findOne({ mobileNo: phone });
    // }

    // // STAFF PORTAL
    // if (portal === "staff") {
    //   user = await RegisterStaff.findOne({ mobileNo: phone });
    // }

    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Account not found",
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "OTP verified and login successfully",
      data: user,
    });

  } catch (error) {
    console.error("Verify OTP Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};