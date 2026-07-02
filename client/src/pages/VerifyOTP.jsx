import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyOTP } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await verifyOTP(email, otp);

      toast.success(response.message);

      navigate("/reset-password");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "OTP Verification Failed"
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
                Verify OTP
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Enter OTP
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                    maxLength={6}
                    required
                  />

                </div>

                <LoadingButton
                  loading={loading}
                  text="Verify OTP"
                  loadingText="Verifying..."
                />

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VerifyOTP;