import { create } from "zustand"
import { persist } from "zustand/middleware"
import { jwtDecode } from "jwt-decode"

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state
      isLoggedIn: false,
      user: null,
      token: null,

      // Function to log in the user
      setLogin: (token) => {
        try {
          const decoded = jwtDecode(token)
          const user = {
            email: decoded.sub,
            role: decoded.role || "CANDIDATE", // Default to CANDIDATE if role not in token
            exp: decoded.exp,
            iat: decoded.iat,
          }

          // Store token in localStorage for immediate access
          localStorage.setItem("token", token)

          set(() => ({
            isLoggedIn: true,
            user: user,
            token: token,
          }))

          console.log("User logged in:", { email: user.email, role: user.role })
        } catch (error) {
          console.error("Invalid token:", error)
          get().setLogout()
        }
      },

      // Function to log out the user
      setLogout: () => {
        // Clear token from localStorage
        localStorage.removeItem("token")

        set(() => ({
          isLoggedIn: false,
          user: null,
          token: null,
        }))

        console.log("User logged out")
      },

      // Function to check if token is expired
      isTokenExpired: () => {
        const { user } = get()
        if (!user || !user.exp) return true
        const isExpired = Date.now() >= user.exp * 1000

        if (isExpired) {
          console.log("Token expired, logging out")
          get().setLogout()
        }

        return isExpired
      },

      // Function to get auth header (deprecated - now handled by axios interceptor)
      getAuthHeader: () => {
        const token = localStorage.getItem("token") || get().token
        if (!token || get().isTokenExpired()) {
          return null
        }
        return { Authorization: `Bearer ${token}` }
      },

      // Function to get current valid token
      getToken: () => {
        const token = localStorage.getItem("token") || get().token
        if (!token || get().isTokenExpired()) {
          return null
        }
        return token
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      // Ensure token is also stored in localStorage when persisting
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          localStorage.setItem("token", state.token)
        }
      },
    },
  ),
)

export default useAuthStore
