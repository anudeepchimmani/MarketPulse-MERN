// ================= Required Field =================
export const validateRequired = (
  value,
  fieldName
) => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required.`;
  }

  return "";
};

// ================= Email =================
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "Email is required.";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
};

// ================= Password =================
export const validatePassword = (
  password
) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return "";
};

// ================= Confirm Password =================
export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Confirm Password is required.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};

// ================= Product Price =================
export const validatePrice = (price) => {
  if (price === "" || price === null) {
    return "Price is required.";
  }

  if (Number(price) <= 0) {
    return "Price must be greater than 0.";
  }

  return "";
};

// ================= Contact Number =================
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === "") {
    return "Contact number is required.";
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    return "Enter a valid 10-digit mobile number.";
  }

  return "";
};

// ================= Name =================
export const validateName = (
  name,
  field = "Name"
) => {
  if (!name || name.trim() === "") {
    return `${field} is required.`;
  }

  if (name.trim().length < 3) {
    return `${field} must be at least 3 characters.`;
  }

  return "";
};