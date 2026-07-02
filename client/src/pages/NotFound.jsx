import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">

        <h1
          className="display-1 fw-bold text-success"
        >
          404
        </h1>

        <h3 className="mb-3">
          Oops! Page Not Found
        </h3>

        <p className="text-muted mb-4">
          The page you are looking for
          doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn btn-success btn-lg"
        >
          🏠 Back to Home
        </Link>

      </div>
    </div>
  );
}

export default NotFound;