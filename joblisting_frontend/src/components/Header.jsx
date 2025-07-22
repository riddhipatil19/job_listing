"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun, faBars, faTimes, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import useThemeStore from "../store/themeStore"
import useAuthStore from "../store/authStore"
import { toast } from "react-toastify"

const Header = () => {
  const { theme, changeTheme } = useThemeStore((state) => state)
  const { isLoggedIn, user, setLogout } = useAuthStore((state) => state)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    setLogout()
    toast.success("Logged out successfully")
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!user) return "/"
    switch (user.role) {
      case "CANDIDATE":
        return "/candidate/dashboard"
      case "RECRUITER":
        return "/recruiter/dashboard"
      case "ADMIN":
        return "/admin/dashboard"
      default:
        return "/"
    }
  }

  return (
    <nav
      className={`w-full h-20 fixed top-0 left-0 z-50 flex justify-center items-center border-b shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-black"
      }`}
    >
      <div className="w-full max-w-7xl px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-blue-600">
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`py-2 px-4 rounded-md transition-colors duration-300 ${
              theme === "dark" ? "text-white hover:bg-blue-600" : "text-black hover:bg-blue-600 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`py-2 px-4 rounded-md transition-colors duration-300 ${
              theme === "dark" ? "text-white hover:bg-blue-600" : "text-black hover:bg-blue-600 hover:text-white"
            }`}
          >
            Jobs
          </Link>

          {/* Theme Switcher */}
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            className="cursor-pointer text-xl hover:text-blue-600 transition-colors duration-300"
            onClick={changeTheme}
          />

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-300 ${
                  theme === "dark" ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>{user.email}</span>
              </button>

              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                >
                  <Link
                    to={getDashboardLink()}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                      theme === "dark" ? "hover:bg-gray-700" : ""
                    }`}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      theme === "dark" ? "hover:bg-gray-700" : ""
                    } text-red-600`}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className={`py-2 px-6 rounded-md transition duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-black hover:bg-blue-600 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="focus:outline-none text-2xl">
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full flex flex-col items-center ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        } transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}
      >
        <Link
          to="/"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-blue-600 hover:text-white"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/jobs"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-blue-600 hover:text-white"
          onClick={toggleMobileMenu}
        >
          Jobs
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to={getDashboardLink()}
              className="w-full py-3 text-center transition-colors duration-300 hover:bg-blue-600 hover:text-white"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout()
                toggleMobileMenu()
              }}
              className="w-full py-3 text-center transition-colors duration-300 hover:bg-red-600 hover:text-white text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-full py-3 text-center transition-colors duration-300 hover:bg-blue-600 hover:text-white"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full py-3 text-center transition-colors duration-300 hover:bg-blue-600 hover:text-white"
              onClick={toggleMobileMenu}
            >
              Register
            </Link>
          </>
        )}

        <div className="w-full py-3 text-center">
          <FontAwesomeIcon
            icon={theme === "light" ? faMoon : faSun}
            className="cursor-pointer text-xl hover:text-blue-600 transition-colors duration-300"
            onClick={() => {
              changeTheme()
              toggleMobileMenu()
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Header
