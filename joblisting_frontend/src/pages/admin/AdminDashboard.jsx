"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faBriefcase,
  faFileAlt,
  faChartLine,
  faUserCheck,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore.js"
import { adminService } from "../../services/adminService.js"
import LoadingSpinner from "../../components/LoadingSpinner.jsx"

const AdminDashboard = () => {
  const { theme } = useThemeStore((state) => state)

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      const response = await adminService.getDashboardStats()
      const statsData = response.data || response
      setStats(statsData)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      toast.error("Failed to load dashboard statistics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />
  }

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          System overview and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <FontAwesomeIcon icon={faUsers} className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Candidates</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalCandidates}</p>
            </div>
            <FontAwesomeIcon icon={faUserCheck} className="text-green-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Recruiters</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalRecruiters}</p>
            </div>
            <FontAwesomeIcon icon={faBuilding} className="text-purple-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Active Users</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.activeUsers}</p>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-yellow-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Jobs</p>
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
            </div>
            <FontAwesomeIcon icon={faBriefcase} className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Applications</p>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
            </div>
            <FontAwesomeIcon icon={faFileAlt} className="text-green-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Database Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Server Load</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Moderate</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm">New user registered</span>
              <span className={`text-xs ml-auto ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                2 min ago
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm">Job posted by recruiter</span>
              <span className={`text-xs ml-auto ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                5 min ago
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm">Application submitted</span>
              <span className={`text-xs ml-auto ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                10 min ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
