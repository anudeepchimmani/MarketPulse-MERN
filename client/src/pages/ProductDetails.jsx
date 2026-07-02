import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";

import {
  getPricesByProduct,
  compareProductPrices,
} from "../services/priceService";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);

  const [prices, setPrices] = useState([]);

  const [comparison, setComparison] =
    useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData =
          await getProductById(id);

        setProduct(productData.product);

        const priceData =
          await getPricesByProduct(id);

        setPrices(priceData.prices);

        const compareData =
          await compareProductPrices(id);

        setComparison(
          compareData.comparison
        );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

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

        <h4 className="mt-3">
          Loading Product Details...
        </h4>

      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">

        <div className="alert alert-danger">
          Product Not Found
        </div>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>
    );
  }

  return (
    <div className="container mt-5">

      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card shadow-lg border-0 mb-4">

        <div className="row g-0">

          <div className="col-md-5 text-center p-4">

            <img
              src={
                product.image
                  ? `http://localhost:5000${product.image}`
                  : "https://via.placeholder.com/400"
              }
              alt={product.productName}
              className="img-fluid rounded"
              style={{
                maxHeight: "350px",
                objectFit: "cover",
              }}
            />

          </div>

          <div className="col-md-7">

            <div className="card-body p-4">

              <h2 className="fw-bold text-success">
                {product.productName}
              </h2>

              <hr />

              <h5>📂 Category</h5>

              <p>{product.category}</p>

              <h5>⚖ Unit</h5>

              <p>{product.unit}</p>

              <h5>📝 Description</h5>

              <p>
                {product.description ||
                  "No description available."}
              </p>
                            <div className="mt-4">

                <span className="badge bg-success fs-6 p-2">
                  Product ID : {product._id}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= Price Analytics ================= */}

      {comparison && (

        <div className="row mb-4">

          <div className="col-md-4">

            <div className="card border-success shadow-sm">

              <div className="card-body text-center">

                <h5>💰 Lowest Price</h5>

                <h3 className="text-success">
                  ₹ {comparison.lowestPrice}
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-danger shadow-sm">

              <div className="card-body text-center">

                <h5>💸 Highest Price</h5>

                <h3 className="text-danger">
                  ₹ {comparison.highestPrice}
                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-primary shadow-sm">

              <div className="card-body text-center">

                <h5>📊 Average Price</h5>

                <h3 className="text-primary">
                  ₹ {comparison.averagePrice}
                </h3>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ================= Price History ================= */}

      <div className="card shadow border-0">

        <div className="card-header bg-success text-white">

          <h5 className="mb-0">

            🏪 Available Markets & Price History

          </h5>

        </div>

        <div className="card-body">

          {prices.length === 0 ? (

            <div className="text-center py-4">

              <h5 className="text-muted">

                No Price History Found

              </h5>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-success">

                  <tr>

                    <th>#</th>

                    <th>Market</th>

                    <th>Location</th>

                    <th>Price</th>

                    <th>Unit</th>

                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>

                  {prices.map((item, index) => (

                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td>
                        {item.market?.marketName}
                      </td>

                      <td>
                        {item.market?.location}
                      </td>

                      <td className="fw-bold text-success">
                        ₹ {item.price}
                      </td>

                      <td>{item.unit}</td>

                      <td>
                        {new Date(
                          item.priceDate
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

export default ProductDetails;