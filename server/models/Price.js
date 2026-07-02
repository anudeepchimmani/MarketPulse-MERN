const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    market: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    priceDate: {
      type: Date,
      default: Date.now,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Price", priceSchema);