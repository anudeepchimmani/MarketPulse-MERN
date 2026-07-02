const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Reset Password
router.post("/reset-password", resetPassword);

// ================= PROTECTED ROUTES =================

// Get Logged-in User Profile
router.get("/profile", protect, getUserProfile);

// Update Logged-in User Profile
router.put("/profile", protect, updateUserProfile);

// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;