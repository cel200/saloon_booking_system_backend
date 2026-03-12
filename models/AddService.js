const mongoose = require("mongoose");

const AddServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },

    // Reference to Section (Hair, Beard, Face etc.)
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    duration: {
      type: Number, // store in minutes
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AddService", AddServiceSchema);