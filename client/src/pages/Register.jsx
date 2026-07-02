import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";

import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validation";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // ================= Validation =================

    let error = validateName(formData.name);

    if (error) {
      toast.error(error);
      return;
    }

    error = validateEmail(formData.email);

    if (error) {
      toast.error(error);
      return;
    }

    error = validatePassword(formData.password);

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {

      const data = await registerUser(formData);

      toast.success(data.message);

      navigate("/login");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >

      <div className="card shadow">

        <div className="card-body">

          <h2 className="text-center mb-4">

            Create Account

          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">

                Name

              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">

                Email

              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">

                Password

              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <small className="text-muted">

                Password must contain at least 6 characters.

              </small>

            </div>

            <LoadingButton
              loading={loading}
              text="Register"
              loadingText="Creating Account..."
            />

          </form>

          <p className="text-center mt-3">

            Already have an account?

            <Link to="/login">

              {" "}Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;