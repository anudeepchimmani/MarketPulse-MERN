const Price = require("../models/Price");

// ================= ADD PRICE =================
const addPrice = async (req, res) => {
  try {
    const price = await Price.create(req.body);

    res.status(201).json({
      success: true,
      message: "Price Added Successfully",
      price,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL PRICES =================
const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find()
      .populate("product", "productName category")
      .populate("market", "marketName location")
      .populate("updatedBy", "name email");

    res.status(200).json({
      success: true,
      count: prices.length,
      prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PRICES BY PRODUCT =================
const getPricesByProduct = async (req, res) => {
  try {
    const prices = await Price.find({
      product: req.params.productId,
    })
      .populate("product", "productName category")
      .populate("market", "marketName location")
      .populate("updatedBy", "name email");

    res.status(200).json({
      success: true,
      count: prices.length,
      prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PRICES BY MARKET =================
const getPricesByMarket = async (req, res) => {
  try {
    const prices = await Price.find({
      market: req.params.marketId,
    })
      .populate("product", "productName category")
      .populate("market", "marketName location")
      .populate("updatedBy", "name email");

    res.status(200).json({
      success: true,
      count: prices.length,
      prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRICE =================
const updatePrice = async (req, res) => {
  try {
    const price = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price Updated Successfully",
      price,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PRICE =================
const deletePrice = async (req, res) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= COMPARE PRODUCT PRICES =================
const compareProductPrices = async (req, res) => {
  try {
    const { productId } = req.params;

    const prices = await Price.find({
      product: productId,
    })
      .populate("product", "productName category")
      .populate("market", "marketName location")
      .sort({ price: 1 });

    if (prices.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No prices found for this product.",
      });
    }

    const lowestPrice = prices[0].price;
    const highestPrice = prices[prices.length - 1].price;

    const averagePrice =
      prices.reduce((sum, item) => sum + item.price, 0) /
      prices.length;

    res.status(200).json({
      success: true,
      comparison: {
        product: prices[0].product.productName,
        lowestPrice,
        highestPrice,
        averagePrice: averagePrice.toFixed(2),
        prices,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EXPORTS =================
module.exports = {
  addPrice,
  getAllPrices,
  getPricesByProduct,
  getPricesByMarket,
  updatePrice,
  deletePrice,
  compareProductPrices,
};