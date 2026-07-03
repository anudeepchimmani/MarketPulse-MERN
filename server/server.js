const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const commodityRoutes = require("./routes/commodityRoutes");
const productRoutes = require("./routes/productRoutes");
const marketRoutes = require("./routes/marketRoutes");
const priceRoutes = require("./routes/priceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ================= Connect Database =================
connectDB();

// ================= Middleware =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://marketpulse-frontend-01nu.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ================= Static Files =================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/commodity", commodityRoutes);
app.use("/api/products", productRoutes);
app.use("/api/markets", marketRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ================= Home =================
app.get("/", (req, res) => {
  res.send("Welcome to MarketPulse Backend 🚀");
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});