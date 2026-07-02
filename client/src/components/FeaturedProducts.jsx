import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();

        // Show only first 4 products
        setProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="container mt-5">
        <div className="text-center">
          <h4 className="text-success">
            Loading Featured Products...
          </h4>
        </div>
      </section>
    );
  }

  return (
    <section className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">
          ⭐ Featured Products
        </h2>

        <p className="text-muted">
          Explore products available in MarketPulse.
        </p>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div
            className="col-lg-3 col-md-6"
            key={product._id}
          >
            <div className="card h-100 shadow-sm border-0">

              <img
                src={
                  product.image
                    ? `http://localhost:5000${product.image}`
                    : "https://via.placeholder.com/300x220?text=No+Image"
                }
                alt={product.productName}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body text-center">

                <h5 className="fw-bold">
                  {product.productName}
                </h5>

                <p className="text-muted">
                  {product.category}
                </p>

                <p className="small text-secondary">
                  {product.description
                    ? product.description.substring(0, 60)
                    : "No description available."}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-success mt-2"
                >
                  👁 View Product
                </Link>

              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;