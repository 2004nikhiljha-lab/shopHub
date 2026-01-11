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

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if:
    // 1. Status is 401 (unauthorized)
    // 2. User is NOT already on login/register pages
    // 3. There's a token in localStorage (meaning user was logged in)
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      const hasToken = localStorage.getItem("userInfo");
      
      // Only redirect if user was authenticated and is NOT on auth pages
      if (hasToken && !isAuthPage) {
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
