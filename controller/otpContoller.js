// const transporter = require("../config/mailer")

// const otpStore = {};
// const generateOtp = ()=>{
//     return Math.floor(100000 + Math.random() * 90000)
// }
// exports.sendOtpEmail = async (req,res) =>{
//     const {email} = req.body;
//     const otp = generateOtp()
//     otpStore[email] = {
//         otp,
//         expiresAt: Date.now() + 5 * 60 * 1000
//     }
//     try {
//         await transporter.sendMail({
//             from:process.env.MAIL_USER,
//             to:email,
//             subject:"OTP Code",
//             text:`Your OTP is ${otp} .It expires at 5 minutes`
//         })
//         res.json({
//             message:"otp sent succesfully",

//         })
//     } catch (error) {
//        res.json({
//         message:"otp not send",
//         error:error.message
//        }) 
//     }
// }
// exports.verifyOtpEmail = (req,res)=>{
//     const {email,otp} = req.body;
//     const storeData = otpStore[email]
//     if(!storeData){
//         return res.status(400).json({
//             message:"OTP not found"
//         })
//     }
//     if(Date.now() > storeData.expiresAt){
//         return res.status(400).json({
//             message:"OTP expires"
//         })
//     }
//     if(storeData.otp != otp){
//         return res.status(400).json({
//             message:"Invalid otp"
//         })
//     }
//     delete otpStore[email]
//     res.json({
//         message:"Otp verified succesfully"
//     })
// }

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Temporary OTP store (for demo)
const otpStore = {};

// Generate 6 digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Send OTP Email
exports.sendOtpEmail = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const otp = generateOtp();

    // Save OTP with expiry
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    const response = await resend.emails.send({
      from: "OTP Service <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:Arial">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    console.log("Resend Response:", response);

    res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error("Email Error:", error);

    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message
    });
  }
};

// Verify OTP
exports.verifyOtpEmail = (req, res) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const storeData = otpStore[email];

    if (!storeData) {
      return res.status(400).json({
        message: "OTP not found"
      });
    }

    if (Date.now() > storeData.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    if (storeData.otp != otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // OTP verified
    delete otpStore[email];

    res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "OTP verification failed",
      error: error.message
    });

  }
};