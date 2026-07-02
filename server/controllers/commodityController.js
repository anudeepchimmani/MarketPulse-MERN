const Commodity = require("../models/Commodity");

// Add Commodity
const addCommodity = async (req, res) => {
  try {
    const commodity = await Commodity.create(req.body);

    res.status(201).json({
      success: true,
      message: "Commodity Added Successfully",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Commodities
const getAllCommodities = async (req, res) => {
  try {
    const commodities = await Commodity.find();

    res.status(200).json({
      success: true,
      count: commodities.length,
      commodities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Commodity By ID
const getCommodityById = async (req, res) => {
  try {
    const commodity = await Commodity.findById(req.params.id);

    if (!commodity) {
      return res.status(404).json({
        success: false,
        message: "Commodity Not Found",
      });
    }

    res.status(200).json({
      success: true,
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Commodity
const updateCommodity = async (req, res) => {
  try {
    const commodity = await Commodity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!commodity) {
      return res.status(404).json({
        success: false,
        message: "Commodity Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Commodity Updated Successfully",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Commodity
const deleteCommodity = async (req, res) => {
  try {
    const commodity = await Commodity.findByIdAndDelete(req.params.id);

    if (!commodity) {
      return res.status(404).json({
        success: false,
        message: "Commodity Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Commodity Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Commodity
const searchCommodity = async (req, res) => {
  try {
    const { keyword } = req.query;

    const commodities = await Commodity.find({
      commodityName: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: commodities.length,
      commodities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter By District
const filterByDistrict = async (req, res) => {
  try {
    const { district } = req.query;

    const commodities = await Commodity.find({
      district: {
        $regex: district,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: commodities.length,
      commodities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCommodity,
  getAllCommodities,
  getCommodityById,
  updateCommodity,
  deleteCommodity,
  searchCommodity,
  filterByDistrict,
};