"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import useThemeStore from "../store/themeStore"
import useAuthStore from "../store/authStore"
import { applicationService } from "../services/applicationService"
import api from "../services/api"

const ApiTestComponent = () => {
  const { theme } = useThemeStore((state) => state)
  const { user, token, getToken } = useAuthStore((state) => state)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const testTokenStorage = () => {
    const localStorageToken = localStorage.getItem("token")
    const zustandToken = token
    const getTokenResult = getToken()

    console.log("Token Test Results:", {
      localStorage: localStorageToken ? "✅ Present" : "❌ Missing",
      zustand: zustandToken ? "✅ Present" : "❌ Missing",
      getToken: getTokenResult ? "✅ Present" : "❌ Missing",
      user: user ? `✅ ${user.email} (${user.role})` : "❌ No user",
    })

    setResults({
      localStorage: localStorageToken,
      zustand: zustandToken,
      getToken: getTokenResult,
      user: user,
    })

    toast.info("Check console for token details")
  }

  const testDirectApiCall = async () => {
    setLoading(true)
    try {
      console.log("Testing direct API call to /api/applications/candidate")

      // Direct axios call with manual token
      const token = localStorage.getItem("token")
      const response = await api.get("/api/applications/candidate", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      console.log("Direct API call successful:", response.data)
      toast.success("Direct API call successful!")
      setResults({ apiCall: "Success", data: response.data })
    } catch (error) {
      console.error("Direct API call failed:", error)
      toast.error(`API call failed: ${error.response?.status} ${error.response?.statusText}`)
      setResults({
        apiCall: "Failed",
        error: error.response?.data || error.message,
        status: error.response?.status,
      })
    } finally {
      setLoading(false)
    }
  }

  const testServiceCall = async () => {
    setLoading(true)
    try {
      console.log("Testing service call via applicationService.getCandidateApplications()")
      const response = await applicationService.getCandidateApplications()

      console.log("Service call successful:", response)
      toast.success("Service call successful!")
      setResults({ serviceCall: "Success", data: response })
    } catch (error) {
      console.error("Service call failed:", error)
      toast.error(`Service call failed: ${error.response?.status} ${error.response?.statusText}`)
      setResults({
        serviceCall: "Failed",
        error: error.response?.data || error.message,
        status: error.response?.status,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <h3 className="text-lg font-semibold mb-4">API Authentication Test</h3>

      <div className="space-y-4">
        <button
          onClick={testTokenStorage}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <FontAwesomeIcon icon={faPlay} className="mr-2" />
          Test Token Storage
        </button>

        <button
          onClick={testDirectApiCall}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          ) : (
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
          )}
          Test Direct API Call
        </button>

        <button
          onClick={testServiceCall}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          ) : (
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
          )}
          Test Service Call
        </button>
      </div>

      {results && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h4 className="font-medium mb-2">Test Results:</h4>
          <pre className="text-sm overflow-auto">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Current User:</strong> {user?.email || "Not logged in"}
        </p>
        <p>
          <strong>Role:</strong> {user?.role || "N/A"}
        </p>
        <p>
          <strong>Token Present:</strong> {localStorage.getItem("token") ? "✅ Yes" : "❌ No"}
        </p>
      </div>
    </div>
  )
}

export default ApiTestComponent
