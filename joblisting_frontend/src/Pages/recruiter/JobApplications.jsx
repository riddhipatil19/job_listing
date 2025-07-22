"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore"
import useApplicationStore from "../../store/applicationStore"
import { applicationService } from "../../services/applicationService"
import { jobService } from "../../services/jobService"
import LoadingSpinner from "../../components/LoadingSpinner"
import ApplicationCard from "../../components/ApplicationCard"

const JobApplications = () => {
  const { jobId } = useParams()
  const { theme } = useThemeStore((state) => state)
  const navigate = useNavigate()
  const { jobApplications, loading, setJobApplications, setLoading, updateApplicationStatus } = useApplicationStore(
    (state) => state,
  )

  const [job, setJob] = useState(null)
  const [filteredApplications, setFilteredApplications] = useState([])
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  })

  useEffect(() => {
    fetchJobAndApplications()
  }, [jobId])

  useEffect(() => {
    filterApplications()
  }, [jobApplications, filters])

  const fetchJobAndApplications = async () => {
    setLoading(true)
    try {
      // Fetch job details
      const jobResponse = await jobService.getJobById(jobId)
      setJob(jobResponse.data || jobResponse)

      // Fetch applications
      const applicationsResponse = await applicationService.getJobApplications(jobId)
      const applicationsData = applicationsResponse.data || applicationsResponse
      setJobApplications(applicationsData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load applications")
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = [...jobApplications]

    if (filters.status) {
      filtered = filtered.filter((app) => app.status === filters.status)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (app) =>
          app.candidateName?.toLowerCase().includes(filters.search.toLowerCase()) ||
          app.candidateEmail?.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    setFilteredApplications(filtered)
  }

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus)
      updateApplicationStatus(applicationId, newStatus)
      toast.success(`Application status updated to ${newStatus.toLowerCase()}`)
    } catch (error) {
      console.error("Error updating application status:", error)
      toast.error("Failed to update application status")
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const clearFilters = () => {
    setFilters({ status: "", search: "" })
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading applications..." />
  }

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/recruiter/jobs")}
          className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-lg transition-colors ${
            theme === "dark" ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Jobs
        </button>
        <h1 className="text-3xl font-bold mb-2">Applications for {job?.title}</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Review and manage candidate applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center">
            <p className="text-2xl font-bold">{jobApplications.length}</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Total Applications</p>
          </div>
        </div>
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {jobApplications.filter((app) => app.status === "PENDING").length}
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
          </div>
        </div>
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {jobApplications.filter((app) => app.status === "INTERVIEW").length}
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Interview</p>
          </div>
        </div>
        <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {jobApplications.filter((app) => app.status === "ACCEPTED").length}
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Accepted</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`p-6 rounded-lg shadow-md mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by candidate name or email..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <select
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          {(filters.status || filters.search) && (
            <button onClick={clearFilters} className="px-4 py-3 text-blue-600 hover:text-blue-700 font-medium">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12">
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {jobApplications.length === 0 ? "No applications yet" : "No applications match your filters"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isRecruiter={true}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default JobApplications
