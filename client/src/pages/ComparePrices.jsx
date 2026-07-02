import { useEffect, useState } from "react";
import {
  compareProductPrices,
} from "../services/priceService";
import {
  getAllProducts,
} from "../services/productService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ComparePrices() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [comparison, setComparison] =
    useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompare = async (productId) => {
    setSelectedProduct(productId);

    if (!productId) {
      setComparison(null);
      return;
    }

    try {
      const data =
        await compareProductPrices(productId);

      setComparison(data.comparison);
    } catch (error) {
      console.error(error);
      setComparison(null);
    }
  };

  const chartData = {
    labels:
      comparison?.prices.map(
        (item) => item.market.marketName
      ) || [],

    datasets: [
      {
        label: "Price (₹)",

        data:
          comparison?.prices.map(
            (item) => item.price
          ) || [],

        backgroundColor: [
          "#28a745",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#20c997",
          "#fd7e14",
          "#6610f2",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Market Price Comparison",
      },
    },
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4 text-center">
        📊 Compare Product Prices
      </h2>

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <label className="form-label fw-bold">
            Select Product
          </label>

          <select
            className="form-select"
            value={selectedProduct}
            onChange={(e) =>
              handleCompare(e.target.value)
            }
          >

            <option value="">
              -- Select Product --
            </option>

            {products.map((product) => (
              <option
                key={product._id}
                value={product._id}
              >
                {product.productName}
              </option>
            ))}

          </select>

        </div>

      </div>

      {comparison && (

        <>

          <div className="row mb-4">

            <div className="col-md-3">

              <div className="card border-success shadow-sm">

                <div className="card-body text-center">

                  <h6>🥇 Lowest Price</h6>

                  <h3>
                    ₹{comparison.lowestPrice}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-danger shadow-sm">

                <div className="card-body text-center">

                  <h6>🔴 Highest Price</h6>

                  <h3>
                    ₹{comparison.highestPrice}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-primary shadow-sm">

                <div className="card-body text-center">

                  <h6>📊 Average Price</h6>

                  <h3>
                    ₹{comparison.averagePrice}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-warning shadow-sm">

                <div className="card-body text-center">

                  <h6>💸 Difference</h6>

                  <h3>
                    ₹
                    {comparison.highestPrice -
                      comparison.lowestPrice}
                  </h3>

                </div>

              </div>

            </div>

          </div>
                    {/* Recommendation */}

          <div className="card shadow border-0 mb-4">

            <div className="card-header bg-success text-white">

              <h5 className="mb-0">
                🏆 Best Market Recommendation
              </h5>

            </div>

            <div className="card-body">

              <h4 className="text-success">

                {comparison.prices[0].market.marketName}

              </h4>

              <p className="mb-1">

                📍 {comparison.prices[0].market.location}

              </p>

              <h5>

                Best Price : ₹{comparison.lowestPrice}

              </h5>

              <p className="text-muted">

                You save ₹
                {comparison.highestPrice -
                  comparison.lowestPrice}
                {" "}compared to the highest priced market.

              </p>

            </div>

          </div>

          {/* Bar Chart */}

          <div className="card shadow border-0 mb-4">

            <div className="card-header bg-primary text-white">

              <h5 className="mb-0">

                📊 Market Price Comparison

              </h5>

            </div>

            <div className="card-body">

              <Bar
                data={chartData}
                options={chartOptions}
              />

            </div>

          </div>

          {/* Comparison Table */}

          <div className="card shadow border-0">

            <div className="card-header bg-success text-white">

              <h5 className="mb-0">

                Market Comparison

              </h5>

            </div>

            <div className="card-body">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>

                    <th>#</th>

                    <th>Market</th>

                    <th>Location</th>

                    <th>Price</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {comparison.prices.map(
                    (item, index) => {

                      const isLowest =
                        item.price ===
                        comparison.lowestPrice;

                      const isHighest =
                        item.price ===
                        comparison.highestPrice;

                      return (

                        <tr
                          key={item._id}
                          className={
                            isLowest
                              ? "table-success"
                              : isHighest
                              ? "table-danger"
                              : ""
                          }
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            {item.market.marketName}
                          </td>

                          <td>
                            {item.market.location}
                          </td>

                          <td>
                            ₹{item.price}
                          </td>

                          <td>

                            {isLowest && (
                              <span className="badge bg-success">
                                🏆 Best Price
                              </span>
                            )}

                            {isHighest && (
                              <span className="badge bg-danger">
                                Highest Price
                              </span>
                            )}

                            {!isLowest &&
                              !isHighest &&
                              "-"}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default ComparePrices;