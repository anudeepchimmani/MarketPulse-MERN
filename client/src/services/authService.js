import api from "./api";

// ================= Register =================
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// ================= Login =================
export const loginUser = async (userData) => {
  const response = await api.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// ================= Forgot Password =================
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

// ================= Verify OTP =================
export const verifyOTP = async (email, otp) => {
  const response = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

// ================= Reset Password =================
export const resetPassword = async (
  email,
  newPassword
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      email,
      newPassword,
    }
  );

  return response.data;
};

// ================= Get Profile =================
export const getUserProfile = async () => {
  const response = await api.get(
    "/auth/profile"
  );

  return response.data;
};

// ================= Update Profile =================
export const updateUserProfile = async (name) => {
  const response = await api.put(
    "/auth/profile",
    { name }
  );

  return response.data;
};

// ================= Change Password =================
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const response = await api.put(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    }
  );

  return response.data;
};

// ================= Logout =================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};