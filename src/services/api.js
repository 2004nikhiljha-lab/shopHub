import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", 
  withCredentials: true,
});

// Attach Authorization header from localStorage before each request
API.interceptors.request.use(
  (config) => {
    try {
      const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
      if (userInfo?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch (e) {
      // ignore parse errors
      console.error("Error parsing userInfo:", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem("userInfo");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default API;
