const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name:{
      type:String
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "STAFF", "CUSTOMER"],
      default: "CUSTOMER",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
