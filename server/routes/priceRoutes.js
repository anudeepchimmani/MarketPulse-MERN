const express = require("express");

const router = express.Router();

const {
  addPrice,
  getAllPrices,
  getPricesByProduct,
  getPricesByMarket,
  updatePrice,
  deletePrice,
  compareProductPrices,
} = require("../controllers/priceController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// ================= PRICE ROUTES =================

// Get All Prices (Everyone)
router.get("/all", getAllPrices);

// Get Prices By Product (Everyone)
router.get("/product/:productId", getPricesByProduct);

// Get Prices By Market (Everyone)
router.get("/market/:marketId", getPricesByMarket);

// ⭐ Compare Product Prices (Everyone)
router.get("/compare/:productId", compareProductPrices);

// Add Price (Admin Only)
router.post("/add", protect, adminOnly, addPrice);

// Update Price (Admin Only)
router.put("/:id", protect, adminOnly, updatePrice);

// Delete Price (Admin Only)
router.delete("/:id", protect, adminOnly, deletePrice);

module.exports = router;