"use client"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faDollarSign, faClock, faBuilding, faEye } from "@fortawesome/free-solid-svg-icons"
import useThemeStore from "../store/themeStore"

const JobCard = ({ job, showActions = false, onEdit, onDelete, onViewApplications }) => {
  const { theme } = useThemeStore((state) => state)

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified"
    return `$${salary.toLocaleString()}`
  }

  const formatJobType = (jobType) => {
    return jobType?.replace("_", " ") || "Not specified"
  }

  return (
    <div
      className={`p-6 rounded-lg shadow-md border transition-all duration-300 hover:shadow-lg ${
        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">
            <Link to={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>
          {job.companyName && (
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-2 text-gray-500" />
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{job.companyName}</span>
            </div>
          )}
        </div>
        {showActions && (
          <div className="flex gap-2 ml-4">
            {onViewApplications && (
              <button
                onClick={() => onViewApplications(job.id)}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                Applications
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(job.id)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(job.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <p className={`text-sm mb-4 line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        {job.description}
      </p>

      <div className="flex flex-wrap gap-4 mb-4">
        {job.location && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {formatSalary(job.salary)}
            </span>
          </div>
        )}
        {job.jobType && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {formatJobType(job.jobType)}
            </span>
          </div>
        )}
      </div>

      {job.skills && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full ${
                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently posted"}
        </span>
        {!showActions && (
          <Link
            to={`/jobs/${job.id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  )
}

export default JobCard
