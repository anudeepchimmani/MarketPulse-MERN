import axios from "axios";

// ================= Axios Instance =================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ================= Add JWT Token =================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;