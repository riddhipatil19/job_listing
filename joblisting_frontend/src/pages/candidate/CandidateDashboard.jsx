"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faBriefcase, faEye, faChartLine, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore.js"
import useAuthStore from "../../store/authStore.js"
import useApplicationStore from "../../store/applicationStore.js"
import { applicationService } from "../../services/applicationService.js"
import { jobService } from "../../services/jobService.js"
import LoadingSpinner from "../../components/LoadingSpinner.jsx"
import ApplicationCard from "../../components/ApplicationCard.jsx"
import JobCard from "../../components/JobCard.jsx"

const CandidateDashboard = () => {
  const { theme } = useThemeStore((state) => state)
  const { user } = useAuthStore((state) => state)
  const { applications, loading, setApplications, setLoading } = useApplicationStore((state) => state)

  const [recentJobs, setRecentJobs] = useState([])
  const [showApiTest, setShowApiTest] = useState(false)
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    interviewApplications: 0,
    acceptedApplications: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      console.log("Fetching dashboard data for candidate:", user?.email)

      // Fetch applications
      const applicationsResponse = await applicationService.getCandidateApplications()
      const applicationsData = applicationsResponse.data || applicationsResponse
      setApplications(applicationsData)

      // Calculate stats
      const stats = {
        totalApplications: applicationsData.length,
        pendingApplications: applicationsData.filter((app) => app.status === "APPLIED").length,
        interviewApplications: applicationsData.filter((app) => app.status === "SHORTLISTED").length,
        acceptedApplications: applicationsData.filter((app) => app.status === "HIRED").length,
      }
      setStats(stats)

      // Fetch recent jobs
      const jobsResponse = await jobService.getAllJobs()
      const jobsData = jobsResponse.data || jobsResponse
      setRecentJobs(jobsData.slice(0, 6)) // Get first 6 jobs
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const getRecentApplications = () => {
    return applications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)).slice(0, 5)
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />
  }

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}!</h1>
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Here's your job search overview
            </p>
          </div>
       
        </div>
      </div>

     

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Applications</p>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
            </div>
            <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-yellow-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Interviews</p>
              <p className="text-2xl font-bold text-blue-600">{stats.interviewApplications}</p>
            </div>
            <FontAwesomeIcon icon={faEye} className="text-blue-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Accepted</p>
              <p className="text-2xl font-bold text-green-600">{stats.acceptedApplications}</p>
            </div>
            <FontAwesomeIcon icon={faPlus} className="text-green-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/jobs"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faSearch} className="text-blue-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Browse Jobs</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Find new opportunities
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/candidate/applications"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFileAlt} className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">My Applications</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Track your applications
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/candidate/profile"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faBriefcase} className="text-purple-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Keep your profile current
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link to="/candidate/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          {getRecentApplications().length === 0 ? (
            <div className="text-center py-8">
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No applications yet</p>
              <Link to="/jobs" className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
                Browse jobs to get started
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {getRecentApplications().map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Jobs */}
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Job Postings</h2>
            <Link to="/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No recent jobs available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard
