import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
