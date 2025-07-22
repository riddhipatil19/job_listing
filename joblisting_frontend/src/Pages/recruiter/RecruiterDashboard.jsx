"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faFileAlt, faChartLine, faPlus, faUsers, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore"
import useAuthStore from "../../store/authStore"
import useJobStore from "../../store/jobStore"
import { jobService } from "../../services/jobService"
import { applicationService } from "../../services/applicationService"
import LoadingSpinner from "../../components/LoadingSpinner"
import JobCard from "../../components/JobCard"

const RecruiterDashboard = () => {
  const { theme } = useThemeStore((state) => state)
  const { user } = useAuthStore((state) => state)
  const { jobs, loading, setJobs, setLoading } = useJobStore((state) => state)

  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch recruiter jobs
      const jobsResponse = await jobService.getRecruiterJobs()
      const jobsData = jobsResponse.data || jobsResponse
      setJobs(jobsData)

      // Calculate job stats
      const jobStats = {
        totalJobs: jobsData.length,
        activeJobs: jobsData.filter((job) => job.status === "ACTIVE" || !job.status).length,
      }

      // Fetch applications for all jobs
      let totalApplications = 0
      let pendingApplications = 0

      for (const job of jobsData) {
        try {
          const appResponse = await applicationService.getJobApplications(job.id)
          const applications = appResponse.data || appResponse
          totalApplications += applications.length
          pendingApplications += applications.filter((app) => app.status === "PENDING").length
        } catch (error) {
          // Job might not have applications yet
          console.log(`No applications for job ${job.id}`)
        }
      }

      setStats({
        ...jobStats,
        totalApplications,
        pendingApplications,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const getRecentJobs = () => {
    return jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />
  }

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Manage your job postings and applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Active Jobs</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
            </div>
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Applications</p>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
            </div>
            <FontAwesomeIcon icon={faFileAlt} className="text-purple-600 text-2xl" />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Pending Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <FontAwesomeIcon icon={faChartLine} className="text-yellow-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/recruiter/jobs/create"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faPlus} className="text-blue-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Post New Job</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Create a new job posting
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/recruiter/jobs"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faBriefcase} className="text-green-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Manage Jobs</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                View and edit your jobs
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/recruiter/profile"
          className={`p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${
            theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Company Profile</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Update company info</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Jobs */}
      <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Job Postings</h2>
          <Link to="/recruiter/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </Link>
        </div>
        {getRecentJobs().length === 0 ? (
          <div className="text-center py-8">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No jobs posted yet</p>
            <Link to="/recruiter/jobs/create" className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
              Post your first job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getRecentJobs().map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showActions={true}
                onViewApplications={(jobId) => (window.location.href = `/recruiter/jobs/${jobId}/applications`)}
                onEdit={(jobId) => (window.location.href = `/recruiter/jobs/edit/${jobId}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecruiterDashboard
