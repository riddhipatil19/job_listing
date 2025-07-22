import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useThemeStore from "../store/themeStore"

const DashboardLayout = () => {
  const { theme, isSidebarOpen } = useThemeStore((state) => state)

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar />
      <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
