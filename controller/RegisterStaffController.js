// const RegisterStaff = require("../models/RegisterStaff");

// const RegisterStaffController = {
//     registerStaff:async(req,res)=>{
        
//         try {
//             const {fullName,email,mobileNo,experience,specialization} = req.body;
//              const existinguser = await RegisterStaff.findOne({ email });
      
       
//         if(existinguser){
//             res.status(404).json({
//                 message:"User already exist, please register with another email"
//             })
//         }
//           const user =await  RegisterStaff.create({fullName,email,mobileNo,experience,specialization});
//         if(user){
//             res.status(200).json({
//                 mesaage:"Staff created successfully"
//             })
//         } 
//         } catch (error) {
//            return res.status(500).json({
//         message: "Failed to register staff",
//         error: error.message,
//       });
//         }
//     },
//      getAllStaffs: async (req, res) => {
//     try {
//       const users = await RegisterStaff.find(); // fetch all users

//       return res.status(200).json({
//         success: true,
//         count: users.length,
//         data: users,
//       });

//     } catch (error) {
//       return res.status(500).json({
//         message: "Failed to fetch satff",
//         error: error.message,
//       });
//     }
//   },
//   deleteStaff:async(req,res)=>{
//     const {id} = req.body;
//     const deleteStaffs = await RegisterStaff.findByIdAndDelete(id)
//      if (!deleteStaffs) {
//         return res.status(404).json({
//           success: false,
//           message: "Staff not found",
//         });
//       }
  
//       return res.status(200).json({
//         success: true,
//         message: "Staff deleted successfully",
//         data: deleteStaffs,
//       });
  
//   },
//   updateStaff:async(req,res)=>{
//     try {
//        const {id,fullName,email,mobileNo,experience,specialization} = req.body;
//      if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Staff ID is required",
//       });
//     }

//     // Build update object dynamically (prevents empty overwrite)
//     const updateData = {};
//     if (fullName) updateData.fullName = fullName;
//     if (email) updateData.email = email;
//     if (mobileNo !== undefined) updateData.mobileNo = mobileNo;
//     if (experience) updateData.experience = experience;
//      if (specialization) updateData.specialization = specialization;

//     const update = await RegisterStaff.findByIdAndUpdate(id,{ $set: updateData },
//       { new: true, runValidators: true })
//        if (!update) {
//       return res.status(404).json({
//         success: false,
//         message: "Staff not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Staff details updated successfully",
//       data: update,
//     });
//     } catch (error) {
//        return res.status(500).json({
//       success: false,
//       message: "Failed to update staff details",
//       error: error.message,
//     });
//     }
   
//   }
// }
// module.exports = RegisterStaffController;const RegisterStaff = require("../models/RegisterStaff");
const RegisterStaff = require("../models/RegisterStaff");
const RegisterStaffController = {

  registerStaff: async (req, res) => {
    try {

      const { fullName, email, mobileNo, experience, specialization, section } = req.body;

      const existinguser = await RegisterStaff.findOne({ email });

      if (existinguser) {
        return res.status(400).json({
          message: "User already exist, please register with another email"
        });
      }

      const user = await RegisterStaff.create({
        fullName,
        email,
        mobileNo,
        experience,
        specialization,
        section
      });

      return res.status(200).json({
        message: "Staff created successfully",
        data: user
      });

    } catch (error) {
      return res.status(500).json({
        message: "Failed to register staff",
        error: error.message,
      });
    }
  },


 getAllStaffs: async (req, res) => {
  try {

    const { sectionId } = req.body || {}; // prevent destructure error

    let filter = {};

    if (sectionId && sectionId.trim() !== "") {
      filter.section = sectionId;
    }

    const users = await RegisterStaff.find(filter).populate("section");

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch staff",
      error: error.message,
    });
  }
},


  deleteStaff: async (req, res) => {

    const { id } = req.body;

    const deleteStaffs = await RegisterStaff.findByIdAndDelete(id);

    if (!deleteStaffs) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      data: deleteStaffs,
    });

  },


  updateStaff: async (req, res) => {
    try {

      const { id, fullName, email, mobileNo, experience, specialization, section } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Staff ID is required",
        });
      }

      const updateData = {};

      if (fullName) updateData.fullName = fullName;
      if (email) updateData.email = email;
      if (mobileNo !== undefined) updateData.mobileNo = mobileNo;
      if (experience) updateData.experience = experience;
      if (specialization) updateData.specialization = specialization;
      if (section) updateData.section = section;

      const update = await RegisterStaff.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!update) {
        return res.status(404).json({
          success: false,
          message: "Staff not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Staff details updated successfully",
        data: update,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update staff details",
        error: error.message,
      });
    }
  }

};

module.exports = RegisterStaffController;