"use client"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTachometerAlt,
  faBriefcase,
  faFileAlt,
  faUser,
  faSignOutAlt,
  faBars,
  faSun,
  faMoon,
  faUsers,
  faChartBar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"
import useThemeStore from "../store/themeStore"
import useAuthStore from "../store/authStore"
import { toast } from "react-toastify"

const Sidebar = () => {
  const { theme, changeTheme, isSidebarOpen, toggleSidebar } = useThemeStore((state) => state)
  const { user, setLogout } = useAuthStore((state) => state)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    setLogout()
    toast.success("Logged out successfully")
    navigate("/")
  }

  const getNavigationItems = () => {
    if (!user) return []

    const baseItems = [
      {
        label: "Dashboard",
        icon: faTachometerAlt,
        to: `/${user.role.toLowerCase()}/dashboard`,
      },
    ]

    switch (user.role) {
      case "CANDIDATE":
        return [
          ...baseItems,
          {
            label: "My Applications",
            icon: faFileAlt,
            to: "/candidate/applications",
          },
          {
            label: "Profile",
            icon: faUser,
            to: "/candidate/profile",
          },
        ]

      case "RECRUITER":
        return [
          ...baseItems,
          {
            label: "My Jobs",
            icon: faBriefcase,
            to: "/recruiter/jobs",
          },
          {
            label: "Create Job",
            icon: faPlus,
            to: "/recruiter/jobs/create",
          },
          {
            label: "Profile",
            icon: faUser,
            to: "/recruiter/profile",
          },
        ]

      case "ADMIN":
        return [
          ...baseItems,
          {
            label: "Users",
            icon: faUsers,
            to: "/admin/users",
          },
          {
            label: "Analytics",
            icon: faChartBar,
            to: "/admin/dashboard",
          },
        ]

      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div
      className={`${isSidebarOpen ? "w-64" : "w-20"} fixed h-full z-30 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } border-r ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {isSidebarOpen && (
          <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>JobPortal</h1>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg ${
            theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {navigationItems.map((item, idx) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                isActive
                  ? theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <button
          onClick={changeTheme}
          className={`flex items-center w-full p-3 rounded-lg transition-colors mb-2 ${
            theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-3">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${
            theme === "dark" ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"
          }`}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
