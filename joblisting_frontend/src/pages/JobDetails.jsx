"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faDollarSign,
  faClock,
  faBuilding,
  faCalendar,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../store/themeStore.js"
import useAuthStore from "../store/authStore.js"
import useJobStore from "../store/jobStore.js"
import { jobService } from "../services/jobService.js"
import { applicationService } from "../services/applicationService.js"
import LoadingSpinner from "../components/LoadingSpinner.jsx"

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme } = useThemeStore((state) => state)
  const { isLoggedIn, user } = useAuthStore((state) => state)
  const { currentJob, setCurrentJob, loading, setLoading } = useJobStore((state) => state)

  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    setLoading(true)
    try {
      const response = await jobService.getJobById(id)
      setCurrentJob(response.data || response)
    } catch (error) {
      console.error("Error fetching job details:", error)
      toast.error("Failed to load job details")
      navigate("/jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!isLoggedIn) {
      toast.info("Please login to apply for jobs")
      navigate("/login")
      return
    }

    if (user.role !== "CANDIDATE") {
      toast.error("Only candidates can apply for jobs")
      return
    }

    setIsApplying(true)
    try {
      await applicationService.applyForJob({
        jobId: Number.parseInt(id),
        coverLetter: coverLetter,
      })
      toast.success("Application submitted successfully!")
      setShowApplicationModal(false)
      setCoverLetter("")
    } catch (error) {
      console.error("Error applying for job:", error)
      toast.error(error.response?.data?.message || "Failed to submit application")
    } finally {
      setIsApplying(false)
    }
  }

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified"
    return `$${salary.toLocaleString()}`
  }

  const formatJobType = (jobType) => {
    return jobType?.replace("_", " ") || "Not specified"
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading job details..." />
  }

  if (!currentJob) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Job not found</p>
          <button
            onClick={() => navigate("/jobs")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 px-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/jobs")}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
            theme === "dark" ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Jobs
        </button>

        {/* Job Details Card */}
        <div
          className={`p-8 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 text-blue-600">{currentJob.title}</h1>
              {currentJob.companyName && (
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faBuilding} className="w-5 h-5 mr-3 text-gray-500" />
                  <span className="text-lg">{currentJob.companyName}</span>
                </div>
              )}
            </div>
            {isLoggedIn && user.role === "CANDIDATE" && (
              <button
                onClick={() => setShowApplicationModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Job Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentJob.location && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{currentJob.location}</p>
                </div>
              </div>
            )}
            {currentJob.salary && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium">{formatSalary(currentJob.salary)}</p>
                </div>
              </div>
            )}
            {currentJob.jobType && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium">{formatJobType(currentJob.jobType)}</p>
                </div>
              </div>
            )}
            {currentJob.createdAt && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">{new Date(currentJob.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
              <p className="whitespace-pre-wrap">{currentJob.description}</p>
            </div>
          </div>

          {/* Skills */}
          {currentJob.skills && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {currentJob.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full ${
                      theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button for Mobile */}
          {isLoggedIn && user.role === "CANDIDATE" && (
            <div className="md:hidden">
              <button
                onClick={() => setShowApplicationModal(true)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <div className="text-center py-6">
              <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Please login to apply for this job
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login to Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`max-w-md w-full p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Apply for {currentJob.title}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cover Letter</label>
              <textarea
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Tell us why you're interested in this position..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowApplicationModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplying && <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />}
                {isApplying ? "Applying..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetails
