import { useEffect, useState } from "react";

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../services/authService";

import { toast } from "react-toastify";

function Profile() {

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [showPasswordSection, setShowPasswordSection] =
    useState(false);

  const [name, setName] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  // ================= LOAD PROFILE =================

  const loadProfile = async () => {

    try {

      const response =
        await getUserProfile();

      setUser(response.user);

      setName(response.user.name);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load profile."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);

  // ================= UPDATE PROFILE =================

  const handleUpdate = async () => {

    try {

      const response =
        await updateUserProfile(name);

      toast.success(response.message);

      setUser(response.user);

      const localUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      localUser.name =
        response.user.name;

      localStorage.setItem(
        "user",
        JSON.stringify(localUser)
      );

      setEditing(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Profile update failed."
      );

    }

  };

  // ================= CHANGE PASSWORD =================

  const handlePasswordChange =
    async () => {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        return toast.error(
          "Please fill all fields."
        );

      }

      if (
        newPassword !== confirmPassword
      ) {

        return toast.error(
          "Passwords do not match."
        );

      }

      try {

        const response =
          await changePassword(
            currentPassword,
            newPassword
          );

        toast.success(
          response.message
        );

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

        setShowPasswordSection(false);

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Password update failed."
        );

      }

    };

  if (loading) {

    return (

      <div className="container mt-5 text-center">

        <h3>

          Loading Profile...

        </h3>

      </div>

    );

  }

  return (

    <div className="container mt-5">

      <div
        className="card shadow-lg mx-auto"
        style={{
          maxWidth: "700px",
        }}
      >

        <div className="card-body p-4">

          <h2 className="text-center mb-4">

            👤 My Profile

          </h2>

          <hr />
                    {/* ================= Profile Details ================= */}

          <div className="mb-3">

            <strong>Name</strong>

            {editing ? (

              <input
                type="text"
                className="form-control mt-2"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            ) : (

              <p className="mt-2">
                {user?.name}
              </p>

            )}

          </div>

          <div className="mb-3">

            <strong>Email</strong>

            <p className="mt-2">
              {user?.email}
            </p>

          </div>

          <div className="mb-3">

            <strong>Role</strong>

            <p className="mt-2 text-capitalize">
              {user?.role}
            </p>

          </div>

          <div className="mb-4">

            <strong>Joined On</strong>

            <p className="mt-2">

              {user?.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "-"}

            </p>

          </div>

          <div className="d-grid gap-2">

            {!editing ? (

              <button
                className="btn btn-primary"
                onClick={() =>
                  setEditing(true)
                }
              >

                ✏ Edit Profile

              </button>

            ) : (

              <>

                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >

                  💾 Save Changes

                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {

                    setEditing(false);

                    setName(user.name);

                  }}
                >

                  Cancel

                </button>

              </>

            )}

          </div>

          <hr className="my-4" />

          {/* ================= Change Password ================= */}

          <button
            className="btn btn-warning w-100"
            onClick={() =>
              setShowPasswordSection(
                !showPasswordSection
              )
            }
          >

            🔒 Change Password

          </button>

          {showPasswordSection && (

            <div className="mt-4">

              <div className="mb-3">

                <label className="form-label">

                  Current Password

                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">

                  New Password

                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

              </div>
                            <div className="mb-3">

                <label className="form-label">

                  Confirm Password

                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-check mb-3">

                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="showPassword"
                >
                  Show Passwords
                </label>

              </div>

              <div className="d-grid">

                <button
                  className="btn btn-success"
                  onClick={handlePasswordChange}
                >

                  🔒 Update Password

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Profile;