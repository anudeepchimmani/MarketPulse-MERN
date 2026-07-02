const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema(
  {
    commodityName: {
      type: String,
      required: true,
      trim: true,
    },

    marketName: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commodity", commoditySchema);