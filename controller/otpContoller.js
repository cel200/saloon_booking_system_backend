const transporter = require("../config/mailer")

const otpStore = {};
const generateOtp = ()=>{
    return Math.floor(100000 + Math.random() * 90000)
}
exports.sendOtpEmail = async (req,res) =>{
    const {email} = req.body;
    const otp = generateOtp()
    otpStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
    }
    try {
        await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:"OTP Code",
            text:`Your OTP is ${otp} .It expires at 5 minutes`
        })
        res.json({
            message:"otp sent succesfully",

        })
    } catch (error) {
       res.json({
        message:"otp not send",
        error:error.message
       }) 
    }
}
exports.verifyOtpEmail = (req,res)=>{
    const {email,otp} = req.body;
    const storeData = otpStore[email]
    if(!storeData){
        return res.status(400).json({
            message:"OTP not found"
        })
    }
    if(Date.now() > storeData.expiresAt){
        return res.status(400).json({
            message:"OTP expires"
        })
    }
    if(storeData.otp != otp){
        return res.status(400).json({
            message:"Invalid otp"
        })
    }
    delete otpStore[email]
    res.json({
        message:"Otp verified succesfully"
    })
}