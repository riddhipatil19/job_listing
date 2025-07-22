import axios from "axios"
import useAuthStore from "../store/authStore"
import { toast } from "react-toastify"

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  timeout: 10000,
  withCredentials: false, // Enable cookies for CORS requests
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage first, then from Zustand store as fallback
    const token = localStorage.getItem("token") || useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Ensure Content-Type is set for POST/PUT requests
    if (config.method === "post" || config.method === "put") {
      config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json"
    }

    console.log("API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      hasToken: !!token,
    })

    return config
  },
  (error) => {
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors and token expiration
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
    })
    return response
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      message: error.response?.data?.message || error.message,
    })

    if (error.response?.status === 401) {
      // Token is invalid or expired
      console.log("401 Unauthorized - clearing auth state")
      localStorage.removeItem("token")
      useAuthStore.getState().setLogout()

      // Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
        toast.error("Session expired. Please login again.")
      }
    } else if (error.response?.status === 403) {
      toast.error("Access denied. Insufficient permissions.")
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.")
    } else if (error.code === "NETWORK_ERROR" || error.message.includes("CORS")) {
      toast.error("Network error. Please check your connection and try again.")
    }

    return Promise.reject(error)
  },
)

export default api
