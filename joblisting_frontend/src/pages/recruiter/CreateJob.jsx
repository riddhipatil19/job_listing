"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore.js"
import useJobStore from "../../store/jobStore.js"
import { jobService } from "../../services/jobService.js"

const CreateJob = () => {
  const { theme } = useThemeStore((state) => state)
  const navigate = useNavigate()
  const { addJob } = useJobStore((state) => state)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "FULL_TIME",
    skills: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "salary" ? (value ? Number.parseInt(value) : "") : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const jobData = {
        ...formData,
        salary: formData.salary ? Number.parseInt(formData.salary) : 0,
      }

      const response = await jobService.createJob(jobData)
      const newJob = response.data || response

      addJob(newJob)
      toast.success("Job posted successfully!")
      navigate("/recruiter/jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      toast.error(error.response?.data?.message || "Failed to create job")
    } finally {
      setIsSubmitting(false)
    }
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
        <h1 className="text-3xl font-bold mb-2">Post New Job</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Create a new job posting to attract qualified candidates
        </p>
      </div>

      {/* Job Form */}
      <div className={`p-8 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              required
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="e.g., Senior Frontend Developer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <input
                type="text"
                name="location"
                required
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="e.g., New York, NY or Remote"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Job Type *</label>
              <select
                name="jobType"
                required
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Salary (Annual)</label>
            <input
              type="number"
              name="salary"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="e.g., 80000"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Required Skills *</label>
            <input
              type="text"
              name="skills"
              required
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="e.g., JavaScript, React, Node.js (comma separated)"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <textarea
              name="description"
              required
              rows={8}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="Describe the role, responsibilities, requirements, and benefits..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate("/recruiter/jobs")}
              className={`px-6 py-3 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />}
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateJob
