const express = require("express");

const router = express.Router();

const {
  addCommodity,
  getAllCommodities,
  getCommodityById,
  updateCommodity,
  deleteCommodity,
  searchCommodity,
  filterByDistrict,
} = require("../controllers/commodityController");

// Search Commodity
router.get("/search", searchCommodity);

// Filter by District
router.get("/district", filterByDistrict);

// Get All Commodities
router.get("/all", getAllCommodities);

// Get Single Commodity
router.get("/:id", getCommodityById);

// Add Commodity
router.post("/add", addCommodity);

// Update Commodity
router.put("/:id", updateCommodity);

// Delete Commodity
router.delete("/:id", deleteCommodity);

module.exports = router;