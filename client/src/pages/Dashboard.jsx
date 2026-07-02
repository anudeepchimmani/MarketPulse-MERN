import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import "../styles/dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Line,
  Bar,
  Pie,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalMarkets: 0,
    totalPrices: 0,
    highestPrice: null,
    lowestPrice: null,
    averagePrice: 0,
    mostActiveMarket: "N/A",
  });

  const [recentPrices, setRecentPrices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState({
    labels: [],
    prices: [],
  });

  // NEW
  const [topProducts, setTopProducts] = useState({
    labels: [],
    prices: [],
  });

  // NEW
  const [categoryChart, setCategoryChart] = useState({
    labels: [],
    counts: [],
  });

  const loadDashboard = async () => {
    try {

      const data = await getDashboardStats();

      setStats(data.dashboard);

      setRecentPrices(data.recentPrices);

      setChartData(data.chartData);

      setTopProducts(data.topProducts);

      setCategoryChart(data.categoryChart);

    } catch (error) {

      console.error("Dashboard Error:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Price Trend (₹)",
        data: chartData.prices,
        borderColor: "#198754",
        backgroundColor: "rgba(25,135,84,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // NEW BAR CHART
  const barData = {
    labels: topProducts.labels,
    datasets: [
      {
        label: "Top Product Prices",
        data: topProducts.prices,
        backgroundColor: [
          "#198754",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
        ],
      },
    ],
  };

  // NEW PIE CHART
  const pieData = {
    labels: categoryChart.labels,
    datasets: [
      {
        data: categoryChart.counts,
        backgroundColor: [
          "#198754",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#20c997",
          "#fd7e14",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h5 className="mt-3">
          Loading Dashboard...
        </h5>

      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1 className="fw-bold">
            📊 Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome to MarketPulse Analytics
          </p>

        </div>

      </div>
            {/* ================= Statistics Cards ================= */}

      <div className="row">

        <div className="col-lg-4 col-md-6 mb-4">

          <div className="card dashboard-card gradient-green">

            <div className="card-body text-center">

              <h5 className="dashboard-title">
                📦 Total Products
              </h5>

              <h2 className="dashboard-number">
                {stats.totalProducts}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-4 col-md-6 mb-4">

          <div className="card dashboard-card gradient-blue">

            <div className="card-body text-center">

              <h5 className="dashboard-title">
                🏪 Total Markets
              </h5>

              <h2 className="dashboard-number">
                {stats.totalMarkets}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-4 col-md-12 mb-4">

          <div className="card dashboard-card gradient-orange">

            <div className="card-body text-center">

              <h5 className="dashboard-title">
                💰 Total Prices
              </h5>

              <h2 className="dashboard-number">
                {stats.totalPrices}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Analytics Cards ================= */}

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card analytics-card border-success shadow-sm">

            <div className="card-body text-center">

              <h6>🥇 Highest Price</h6>

              <h4>
                {stats.highestPrice
                  ? `₹${stats.highestPrice.price}`
                  : "-"}
              </h4>

              <small className="text-muted">
                {stats.highestPrice?.product}
              </small>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card analytics-card border-primary shadow-sm">

            <div className="card-body text-center">

              <h6>🥈 Lowest Price</h6>

              <h4>
                {stats.lowestPrice
                  ? `₹${stats.lowestPrice.price}`
                  : "-"}
              </h4>

              <small className="text-muted">
                {stats.lowestPrice?.product}
              </small>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card analytics-card border-warning shadow-sm">

            <div className="card-body text-center">

              <h6>📊 Average Price</h6>

              <h4>
                ₹{stats.averagePrice}
              </h4>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card analytics-card border-danger shadow-sm">

            <div className="card-body text-center">

              <h6>🏆 Most Active Market</h6>

              <h6 className="fw-bold">
                {stats.mostActiveMarket}
              </h6>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Charts Row ================= */}

      <div className="row">

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-header bg-success text-white">

              <h5 className="mb-0">
                📈 Price Trend
              </h5>

            </div>

            <div className="card-body">

              <Line
                data={lineData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />

            </div>

          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0 h-100">

            <div className="card-header bg-primary text-white">

              <h5 className="mb-0">
                📊 Top 5 Expensive Products
              </h5>

            </div>

            <div className="card-body">

              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />

            </div>

          </div>

        </div>

      </div>
            {/* ================= Category Pie Chart ================= */}

      <div className="row">

        <div className="col-lg-12 mb-4">

          <div className="card shadow border-0">

            <div className="card-header bg-warning">

              <h5 className="mb-0 text-dark">
                🥧 Products by Category
              </h5>

            </div>

            <div className="card-body">

              <div
                style={{
                  maxWidth: "450px",
                  margin: "0 auto",
                }}
              >

                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Recent Price Updates ================= */}

      <div className="card table-card shadow border-0">

        <div className="card-header bg-success text-white">

          <h5 className="mb-0">
            🕒 Recent Price Updates
          </h5>

        </div>

        <div className="card-body">

          {recentPrices.length === 0 ? (

            <div className="text-center py-5">

              <h5 className="text-muted">
                No recent price updates.
              </h5>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-success">

                  <tr>

                    <th>Image</th>

                    <th>Product</th>

                    <th>Market</th>

                    <th>Price</th>

                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>

                  {recentPrices.map((price) => (

                    <tr key={price._id}>

                      <td>

                        <img
                          src={
                            price.product?.image
                              ? `http://localhost:5000${price.product.image}`
                              : "https://via.placeholder.com/50"
                          }
                          alt={
                            price.product?.productName
                          }
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />

                      </td>

                      <td className="fw-bold">

                        {price.product?.productName}

                      </td>

                      <td>

                        {price.market?.marketName}

                      </td>

                      <td className="fw-bold text-success">

                        ₹ {price.price}

                      </td>

                      <td>

                        {new Date(
                          price.createdAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
          </div>
  );
}

export default Dashboard;