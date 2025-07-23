import axios from "axios";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

// ✅ Axios instance with dynamic baseURL from Vite env
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    timeout: 10000,
    withCredentials: false, // Set to true only if using HttpOnly cookies
});

// ✅ Request interceptor — adds token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add Content-Type header if needed
        if (config.method === "post" || config.method === "put") {
            config.headers["Content-Type"] =
                config.headers["Content-Type"] || "application/json";
        }

        console.log("API Request:", {
            method: config.method?.toUpperCase(),
            url: config.url,
            headers: config.headers,
            hasToken: !!token,
        });

        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// ✅ Response interceptor — handles common error cases
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", {
            status: response.status,
            url: response.config.url,
            method: response.config.method?.toUpperCase(),
        });
        return response;
    },
    (error) => {
        console.error("API Error:", {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method?.toUpperCase(),
            message: error.response?.data?.message || error.message,
        });

        const status = error.response?.status;

        if (status === 401) {
            console.log("401 Unauthorized - clearing auth state");
            localStorage.removeItem("token");
            useAuthStore.getState().setLogout();

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
                toast.error("Session expired. Please login again.");
            }
        } else if (status === 403) {
            toast.error("Access denied. Insufficient permissions.");
        } else if (status >= 500) {
            toast.error("Server error. Please try again later.");
        } else if (error.code === "NETWORK_ERROR" || error.message.includes("CORS")) {
            toast.error("Network error. Please check your connection and try again.");
        }

        return Promise.reject(error);
    }
);

export default api;
