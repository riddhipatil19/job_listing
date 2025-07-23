"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faMapMarkerAlt, faDollarSign, faFilter } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../store/themeStore.js"
import useJobStore from "../store/jobStore.js"
import { jobService } from "../services/jobService.js"
import JobCard from "../components/JobCard.jsx"
import LoadingSpinner from "../components/LoadingSpinner.jsx"

const JobListings = () => {
  const { theme } = useThemeStore((state) => state)
  const { jobs, loading, error, searchFilters, setJobs, setLoading, setError, setSearchFilters } = useJobStore(
    (state) => state,
  )

  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await jobService.getAllJobs()
      setJobs(response.data || response)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setError("Failed to fetch jobs")
      toast.error("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const params = {}
      if (searchFilters.query) params.q = searchFilters.query
      if (searchFilters.location) params.location = searchFilters.location
      if (searchFilters.jobType) params.jobType = searchFilters.jobType
      if (searchFilters.minSalary) params.minSalary = searchFilters.minSalary
      if (searchFilters.maxSalary) params.maxSalary = searchFilters.maxSalary

      const response = await jobService.searchJobs(params)
      setJobs(response.data || response)
    } catch (error) {
      console.error("Error searching jobs:", error)
      toast.error("Search failed")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setSearchFilters({ [field]: value })
  }

  const clearFilters = () => {
    setSearchFilters({
      query: "",
      location: "",
      jobType: "",
      minSalary: "",
      maxSalary: "",
    })
    fetchJobs()
  }

  return (
    <div className={`min-h-screen py-8 px-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Find Your Dream Job</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Discover thousands of job opportunities from top companies
          </p>
        </div>

        {/* Search Section */}
        <div className={`p-6 rounded-lg shadow-md mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={searchFilters.query}
                  onChange={(e) => handleFilterChange("query", e.target.value)}
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Search Jobs
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faFilter} />
                Advanced Filters
              </button>
              {(searchFilters.query ||
                searchFilters.location ||
                searchFilters.jobType ||
                searchFilters.minSalary ||
                searchFilters.maxSalary) && (
                <button type="button" onClick={clearFilters} className="text-blue-600 hover:text-blue-700 font-medium">
                  Clear Filters
                </button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <select
                  className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={searchFilters.jobType}
                  onChange={(e) => handleFilterChange("jobType", e.target.value)}
                >
                  <option value="">All Job Types</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Min Salary"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    value={searchFilters.minSalary}
                    onChange={(e) => handleFilterChange("minSalary", e.target.value)}
                  />
                </div>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="Max Salary"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    value={searchFilters.maxSalary}
                    onChange={(e) => handleFilterChange("maxSalary", e.target.value)}
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {loading ? "Searching..." : `${jobs.length} jobs found`}
          </p>
        </div>

        {/* Job Listings */}
        {loading ? (
          <LoadingSpinner size="lg" text="Loading jobs..." />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              No jobs found. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobListings
