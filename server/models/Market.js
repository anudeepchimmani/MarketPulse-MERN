const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    marketName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Market", marketSchema);