import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="py-5"
      style={{
        background:
          "linear-gradient(135deg, #198754, #28a745)",
        color: "#fff",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6">

            <h1 className="display-3 fw-bold">
              MarketPulse
            </h1>

            <h3 className="mb-4">
              Daily Price Watch for Local Markets
            </h3>

            <p className="lead">

              Compare daily prices across different
              local markets, monitor price trends,
              discover the best deals and make
              informed purchasing decisions with
              real-time market data.

            </p>

            <div className="mt-4">

              <Link
                to="/markets"
                className="btn btn-light btn-lg me-3"
              >
                🏪 Explore Markets
              </Link>

              <Link
                to="/prices"
                className="btn btn-outline-light btn-lg"
              >
                💰 Today's Prices
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 text-center mt-5 mt-lg-0">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
              alt="Market"
              className="img-fluid rounded shadow-lg"
              style={{
                maxHeight: "450px",
                objectFit: "cover",
              }}
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;