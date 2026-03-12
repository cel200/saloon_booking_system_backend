// updateSettings.controller.js
const User = require("../models/User");
const Saloon = require("../models/Saloon");
const sendEmail = require("../utils/sendEmail");

const updateSettings = async (req, res) => {
  try {
    const { saloonName, saloonEmail } = req.body;

    // 1. Update saloon settings
    const saloon = await Saloon.create(
      
      { name: saloonName, email: saloonEmail },
      // { new: true }
    );
   const change = await User.findByIdAndUpdate(
  "698a195ee2a1ba9c5955cd63",
  { 
    name: saloonName, 
    email: saloonEmail 
  },
  { new: true } // returns updated document
);
    // 2. Get all admin users
    const admins = await User.find({ role: "admin" });

    // 3. Send email to admins
    const adminEmails = admins.map(admin => admin.email);

    await sendEmail({
      to: "celestamamachan@gmail.com",
      subject: "Saloon Settings Updated",
      html: `
        <p>Saloon settings have been updated.</p>
        <p><b>Name:</b> ${saloonName}</p>
        <p><b>Email:</b> ${saloonEmail}</p>
      `
    });

    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const getSaloon = async(req,res)=>{
  
  try {
    const saloonDetails = await User.find();
    if(saloonDetails){
       return res.status(200).json({
        success: true,
        
        data: saloonDetails,
      });
    }
  } catch (error) {
    return res.status(500).json({
        message: "Failed to fetch user settings",
        error: error.message,
      });
  }
}
module.exports = { updateSettings,getSaloon };