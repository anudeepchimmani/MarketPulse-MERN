import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";

import {
  validateEmail,
  validatePassword,
} from "../utils/validation";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

    let error = validateEmail(formData.email);

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

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(data.message);

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
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

            Login

          </h2>

          <form onSubmit={handleSubmit}>

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

            <div className="mb-2">

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

            

            </div>

            <div className="text-end mb-3">

              <Link
                to="/forgot-password"
                className="text-decoration-none"
              >

                Forgot Password?

              </Link>

            </div>

            <LoadingButton
              loading={loading}
              text="Login"
              loadingText="Logging in..."
            />

          </form>

          <p className="text-center mt-3">

            Don't have an account?

            <Link to="/register">

              {" "}Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;