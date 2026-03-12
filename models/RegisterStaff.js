// const mongoose = require("mongoose");

// const RegisterStaffSchema = new mongoose.Schema(
//   {
//     fullName:{
//       type:String,
//       required:true,
//     },
//    email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//      mobileNo:{
//         type:Number,
//         required:true
//      },
//      experience:{
//       type:String,
//       required:true,
//     },
//     specialization:{
//       type:String,
//       required:true,
//     }
    
   
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("RegisterStaff", RegisterStaffSchema);
const mongoose = require("mongoose");

const RegisterStaffSchema = new mongoose.Schema({
  
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobileNo: {
    type: Number,
    required: true
  },

  experience: {
    type: String
  },

  specialization: {
    type: String
  },

  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("RegisterStaff", RegisterStaffSchema);