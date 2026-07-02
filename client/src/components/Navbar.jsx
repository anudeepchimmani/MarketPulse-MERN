import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logoutUser();

    toast.success("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          MarketPulse
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {token ? (
              <>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/markets">
                    Markets
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/prices">
                    Prices
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/compare-prices"
                  >
                    📊 Compare Prices
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/profile"
                  >
                    👤 {user?.name}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

              </>
            ) : (
              <>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>

              </>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;