import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPassword } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await forgotPassword(email);

      toast.success(response.message);

      // Save email for next page
      localStorage.setItem("resetEmail", email);

      navigate("/verify-otp");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">
                Forgot Password
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <LoadingButton
                  loading={loading}
                  text="Send OTP"
                  loadingText="Sending OTP..."
                />

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;