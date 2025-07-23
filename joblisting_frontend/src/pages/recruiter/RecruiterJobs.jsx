"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore.js"
import useJobStore from "../../store/jobStore.js"
import { jobService } from "../../services/jobService.js"
import LoadingSpinner from "../../components/LoadingSpinner.jsx"
import JobCard from "../../components/JobCard.jsx"

const RecruiterJobs = () => {
  const { theme } = useThemeStore((state) => state)
  const navigate = useNavigate()
  const { jobs, loading, setJobs, setLoading, removeJob } = useJobStore((state) => state)

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await jobService.getRecruiterJobs()
      const jobsData = response.data || response
      setJobs(jobsData)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast.error("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    if (!searchTerm) {
      setFilteredJobs(jobs)
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredJobs(filtered)
    }
  }

  const handleEdit = (jobId) => {
    navigate(`/recruiter/jobs/edit/${jobId}`)
  }

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      try {
        await jobService.deleteJob(jobId)
        removeJob(jobId)
        toast.success("Job deleted successfully")
      } catch (error) {
        console.error("Error deleting job:", error)
        toast.error("Failed to delete job")
      }
    }
  }

  const handleViewApplications = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}/applications`)
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading jobs..." />
  }

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Jobs</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Manage your job postings and applications
          </p>
        </div>
        <Link
          to="/recruiter/jobs/create"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Search */}
      <div className={`p-6 rounded-lg shadow-md mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search jobs by title, location, or skills..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className={`text-lg mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {jobs.length === 0 ? "No jobs posted yet" : "No jobs match your search"}
          </p>
          {jobs.length === 0 && (
            <Link
              to="/recruiter/jobs/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post Your First Job
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewApplications={handleViewApplications}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecruiterJobs
