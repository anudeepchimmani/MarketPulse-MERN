const express = require("express");

const router = express.Router();

const {
  addMarket,
  getAllMarkets,
  updateMarket,
  deleteMarket,
} = require("../controllers/marketController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// ================= Market Routes =================

// Get All Markets (Everyone)
router.get("/all", getAllMarkets);

// Add Market (Admin Only)
router.post("/add", protect, adminOnly, addMarket);

// Update Market (Admin Only)
router.put("/:id", protect, adminOnly, updateMarket);

// Delete Market (Admin Only)
router.delete("/:id", protect, adminOnly, deleteMarket);

module.exports = router;