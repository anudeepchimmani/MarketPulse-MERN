import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword } from "../services/authService";
import LoadingButton from "../components/common/LoadingButton";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(
        email,
        newPassword
      );

      toast.success(response.message);

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Password reset failed"
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
                Reset Password
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />

                </div>

                <LoadingButton
                  loading={loading}
                  text="Reset Password"
                  loadingText="Resetting Password..."
                />

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;