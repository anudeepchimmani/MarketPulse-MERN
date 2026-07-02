const express = require("express");

const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const upload = require("../middleware/uploadMiddleware");

// ================= Product Routes =================

// Get All Products (Everyone)
router.get("/all", getAllProducts);

// Get Single Product (Everyone)
router.get("/:id", getProductById);

// Add Product (Admin Only + Image Upload)
router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  addProduct
);

// Update Product (Admin Only + Image Upload)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct
);

// Delete Product (Admin Only)
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;
