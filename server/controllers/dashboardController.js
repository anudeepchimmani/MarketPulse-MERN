const Product = require("../models/Product");
const Market = require("../models/Market");
const Price = require("../models/Price");

const getDashboardStats = async (req, res) => {
  try {

    // ================= Dashboard Counts =================

    const totalProducts = await Product.countDocuments();

    const totalMarkets = await Market.countDocuments();

    const totalPrices = await Price.countDocuments();

    // ================= Recent Price Updates =================

    const recentPrices = await Price.find()
      .populate("product", "productName image")
      .populate("market", "marketName location")
      .sort({ createdAt: -1 })
      .limit(5);

    // ================= Price Trend Chart =================

    const chartPrices = await Price.find()
      .sort({ createdAt: 1 })
      .limit(7);

    const labels = chartPrices.map((item) =>
      new Date(item.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      )
    );

    const prices = chartPrices.map(
      (item) => item.price
    );

    // ================= Highest Price =================

    const highestPrice = await Price.findOne()
      .sort({ price: -1 })
      .populate("product", "productName");

    // ================= Lowest Price =================

    const lowestPrice = await Price.findOne()
      .sort({ price: 1 })
      .populate("product", "productName");

    // ================= Average Price =================

    const averageResult =
      await Price.aggregate([
        {
          $group: {
            _id: null,
            averagePrice: {
              $avg: "$price",
            },
          },
        },
      ]);

    const averagePrice =
      averageResult.length > 0
        ? averageResult[0].averagePrice.toFixed(2)
        : 0;

    // ================= Most Active Market =================

    const marketStats =
      await Price.aggregate([
        {
          $group: {
            _id: "$market",
            totalEntries: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalEntries: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

    let mostActiveMarket = null;

    if (marketStats.length > 0) {
      mostActiveMarket =
        await Market.findById(
          marketStats[0]._id
        );
    }

    // ================= NEW =================
    // Top 5 Most Expensive Products

    const topProducts = await Price.find()
      .sort({ price: -1 })
      .limit(5)
      .populate(
        "product",
        "productName image"
      );
          // ================= NEW =================
    // Products by Category (Pie Chart)

    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    const categoryLabels = categoryStats.map(
      (item) => item._id
    );

    const categoryCounts = categoryStats.map(
      (item) => item.total
    );

    // ================= Response =================

    res.status(200).json({
      success: true,

      dashboard: {
        totalProducts,
        totalMarkets,
        totalPrices,

        highestPrice: highestPrice
          ? {
              product:
                highestPrice.product?.productName,
              price: highestPrice.price,
            }
          : null,

        lowestPrice: lowestPrice
          ? {
              product:
                lowestPrice.product?.productName,
              price: lowestPrice.price,
            }
          : null,

        averagePrice,

        mostActiveMarket:
          mostActiveMarket?.marketName || "N/A",
      },

      recentPrices,

      chartData: {
        labels,
        prices,
      },

      // ================= NEW =================
      topProducts: {
        labels: topProducts.map(
          (item) =>
            item.product?.productName || "Unknown"
        ),
        prices: topProducts.map(
          (item) => item.price
        ),
      },

      categoryChart: {
        labels: categoryLabels,
        counts: categoryCounts,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};