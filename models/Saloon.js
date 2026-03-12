// models/Saloon.js
const mongoose = require("mongoose");

const saloonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    logo: {
      type: String // image URL
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
);


module.exports = mongoose.model("Saloon",saloonSchema)
