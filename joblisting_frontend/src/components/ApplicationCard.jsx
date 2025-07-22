"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faBuilding, faMapMarkerAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons"
import useThemeStore from "../store/themeStore"

const ApplicationCard = ({ application, isRecruiter = false, onStatusUpdate }) => {
  const { theme } = useThemeStore((state) => state)

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hired":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "shortlisted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleStatusChange = (newStatus) => {
    if (onStatusUpdate) {
      onStatusUpdate(application.id, newStatus)
    }
  }

  return (
    <div
      className={`p-6 rounded-lg shadow-md border transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            {isRecruiter ? application.candidateName || application.candidateEmail : application.jobTitle}
          </h3>
          {!isRecruiter && application.companyName && (
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-2 text-gray-500" />
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{application.companyName}</span>
            </div>
          )}
          {isRecruiter && application.candidateEmail && (
            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {application.candidateEmail}
            </p>
          )}
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(application.status)}`}>
          {application.status || "Pending"}
        </span>
      </div>

      {application.coverLetter && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Cover Letter:</h4>
          <p
            className={`text-sm p-3 rounded ${
              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"
            }`}
          >
            {application.coverLetter}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-4">
        {application.appliedAt && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Applied: {new Date(application.appliedAt).toLocaleDateString()}
            </span>
          </div>
        )}
        {!isRecruiter && application.location && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {application.location}
            </span>
          </div>
        )}
        {!isRecruiter && application.salary && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              ${application.salary.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {isRecruiter && onStatusUpdate && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleStatusChange("SHORTLISTED")}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Interview
          </button>
          <button
            onClick={() => handleStatusChange("HIRED")}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusChange("REJECTED")}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}

export default ApplicationCard
