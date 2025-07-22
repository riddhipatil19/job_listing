"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../store/themeStore"
import useAuthStore from "../store/authStore"
import { authService } from "../services/authService"

const Login = () => {
  const { theme } = useThemeStore((state) => state)
  const { setLogin } = useAuthStore((state) => state)
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from?.pathname || "/"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting login for:", formData.email)
      const response = await authService.login(formData)
      console.log("Login response:", response)
if (response.token) {
  // Pass the entire response object to the auth store
  setLogin(response) // <--- FIX IS HERE
  toast.success("Login successful!")

  // Redirect based on user role from the response
  const userRole = response.role || "CANDIDATE"
  console.log("User role for redirect:", userRole)

  switch (userRole) {
    case "CANDIDATE":
      navigate("/candidate/dashboard")
      break
    case "RECRUITER":
      navigate("/recruiter/dashboard")
      break
    case "ADMIN":
      navigate("/admin/dashboard")
      break
    default:
      navigate(from) // Fallback to original destination
  }
}
    else {
        throw new Error("No token received from server")
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === "dark" ? "text-gray-50" : "text-gray-900"}`}>Sign in to your account</h2>
          <p className={`mt-2 text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Or{" "}
            <Link to="/register" className={`font-medium text-blue-600 hover:text-blue-500`}>
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full px-3 py-3 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`relative block w-full px-3 py-3 pr-10 border rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}
                />
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <FontAwesomeIcon icon={faSpinner} className="animate-spin -ml-1 mr-3 h-5 w-5" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
