const mongoose = require("mongoose");

const RegisterUserSchema = new mongoose.Schema(
  {
    fullName:{
      type:String,
      required:true,
    },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
     mobileNo:{
        type:Number,
        required:true
     },
     password:{
       type: String,
      required: true,
     }
    
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisterUser", RegisterUserSchema);
