const Market = require("../models/Market");

// Add Market
const addMarket = async (req, res) => {
  try {
    const market = await Market.create(req.body);

    res.status(201).json({
      success: true,
      message: "Market Added Successfully",
      market,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Markets
const getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find();

    res.status(200).json({
      success: true,
      count: markets.length,
      markets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Market
const updateMarket = async (req, res) => {
  try {
    const market = await Market.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!market) {
      return res.status(404).json({
        success: false,
        message: "Market Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Market Updated Successfully",
      market,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Market
const deleteMarket = async (req, res) => {
  try {
    const market = await Market.findByIdAndDelete(req.params.id);

    if (!market) {
      return res.status(404).json({
        success: false,
        message: "Market Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Market Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addMarket,
  getAllMarkets,
  updateMarket,
  deleteMarket,
};