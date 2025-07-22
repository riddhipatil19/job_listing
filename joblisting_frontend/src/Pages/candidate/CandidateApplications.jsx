
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../../store/themeStore"
import useApplicationStore from "../../store/applicationStore"
import { applicationService } from "../../services/applicationService"
import LoadingSpinner from "../../components/LoadingSpinner"
import ApplicationCard from "../../components/ApplicationCard"

const CandidateApplications = () => {
  const { theme } = useThemeStore((state) => state)
  const { applications, loading, setApplications, setLoading } = useApplicationStore((state) => state)

  const [filteredApplications, setFilteredApplications] = useState([])
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, filters])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const response = await applicationService.getCandidateApplications()
      const applicationsData = response.data || response
      setApplications(applicationsData)
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast.error("Failed to load applications")
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = [...applications]

    if (filters.status) {
      filtered = filtered.filter((app) => app.status === filters.status)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (app) =>
          app.jobTitle?.toLowerCase().includes(filters.search.toLowerCase()) ||
          app.companyName?.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    setFilteredApplications(filtered)
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
        <h1 className="text-3xl font-bold mb-2">My Applications</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Track and manage your job applications
        </p>
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
              placeholder="Search by job title or company..."
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
          <p className={`text-lg mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {applications.length === 0 ? "No applications yet" : "No applications match your filters"}
          </p>
          {applications.length === 0 && (
            <a href="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse jobs to get started
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CandidateApplications
