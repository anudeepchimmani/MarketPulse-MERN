import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>

      {/* ================= Hero ================= */}

      <Hero />

      {/* ================= Features ================= */}

      <section className="container mt-5">

        <div className="text-center mb-5">

          <h2 className="fw-bold">
            Why Choose MarketPulse?
          </h2>

          <p className="text-muted">
            Everything you need to monitor local market prices in one place.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-3">

            <div className="card h-100 shadow-sm border-0">

              <div className="card-body text-center">

                <h1>📦</h1>

                <h5>Products</h5>

                <p className="text-muted">
                  Manage fruits, vegetables and agricultural products.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card h-100 shadow-sm border-0">

              <div className="card-body text-center">

                <h1>🏪</h1>

                <h5>Markets</h5>

                <p className="text-muted">
                  Compare local market prices instantly.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card h-100 shadow-sm border-0">

              <div className="card-body text-center">

                <h1>💰</h1>

                <h5>Daily Prices</h5>

                <p className="text-muted">
                  View and compare daily prices easily.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card h-100 shadow-sm border-0">

              <div className="card-body text-center">

                <h1>📊</h1>

                <h5>Analytics</h5>

                <p className="text-muted">
                  Interactive reports and market insights.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Featured Products ================= */}

      <FeaturedProducts />
            {/* ================= About ================= */}

      <section className="container mt-5">

        <div className="row align-items-center">

          <div className="col-lg-6">

            <h2 className="fw-bold mb-4">
              🌱 About MarketPulse
            </h2>

            <p className="lead text-muted">

              MarketPulse is a smart web application that helps
              farmers, traders, retailers and consumers
              monitor daily agricultural market prices.

            </p>

            <p>

              Compare prices across multiple markets,
              manage products, maintain daily price updates
              and make better purchasing decisions with
              real-time market information.

            </p>

            <Link
              to="/dashboard"
              className="btn btn-success mt-3"
            >
              📊 Go to Dashboard
            </Link>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
              alt="Market"
              className="img-fluid rounded shadow"
            />

          </div>

        </div>

      </section>

      {/* ================= Call To Action ================= */}

      <section className="container mt-5">

        <div className="card bg-success text-white border-0 shadow">

          <div className="card-body text-center py-5">

            <h2 className="fw-bold">

              Ready to Explore Local Market Prices?

            </h2>

            <p className="mt-3">

              Stay updated with daily prices,
              compare markets and make smarter
              buying decisions using MarketPulse.

            </p>

            <Link
              to="/markets"
              className="btn btn-light btn-lg mt-3"
            >
              🏪 Explore Markets
            </Link>

          </div>

        </div>

      </section>

      {/* ================= Footer ================= */}

      <footer className="bg-dark text-light mt-5">

        <div className="container py-5">

          <div className="row">

                      <div className="col-md-4">

              <h4>MarketPulse</h4>

              <p>

                Daily Price Watch for Local Markets.
                Helping farmers, traders and consumers
                compare prices and make informed decisions.

              </p>

            </div>

            <div className="col-md-4">

              <h5>Quick Links</h5>

              <ul className="list-unstyled">

                <li className="mb-2">

                  <Link
                    to="/"
                    className="text-light text-decoration-none"
                  >
                    🏠 Home
                  </Link>

                </li>

                <li className="mb-2">

                  <Link
                    to="/products"
                    className="text-light text-decoration-none"
                  >
                    📦 Products
                  </Link>

                </li>

                <li className="mb-2">

                  <Link
                    to="/markets"
                    className="text-light text-decoration-none"
                  >
                    🏪 Markets
                  </Link>

                </li>

                <li className="mb-2">

                  <Link
                    to="/prices"
                    className="text-light text-decoration-none"
                  >
                    💰 Prices
                  </Link>

                </li>

                <li className="mb-2">

                  <Link
                    to="/dashboard"
                    className="text-light text-decoration-none"
                  >
                    📊 Dashboard
                  </Link>

                </li>

              </ul>

            </div>

            <div className="col-md-4">

              <h5>Contact</h5>

              <p>

                📧 support@marketpulse.com

              </p>

              <p>

                📞 +91 98765 43210

              </p>

              <p>

                📍 India

              </p>

            </div>

          </div>

          <hr />

          <div className="text-center">

            © 2026 MarketPulse.
            All Rights Reserved.

          </div>

        </div>

      </footer>
          </>

  );

}

export default Home;