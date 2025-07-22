import api from "./api"

export const applicationService = {
  // Candidate endpoints
  applyForJob: async (applicationData) => {
    console.log("Applying for job:", applicationData)
    const response = await api.post("/api/applications/candidate/apply", applicationData)
    return response.data
  },

  getCandidateApplications: async () => {
    console.log("Fetching candidate applications...")
    const response = await api.get("/api/applications/candidate")
    return response.data
  },

  // Recruiter endpoints
  getJobApplications: async (jobId) => {
    console.log("Fetching applications for job:", jobId)
    const response = await api.get(`/api/applications/recruiter/job/${jobId}`)
    return response.data
  },

  // applicationService.js

updateApplicationStatus: async (applicationId, status) => {
  console.log("Updating application status:", { applicationId, status })

  // This sends the status as a URL QUERY PARAMETER
  const response = await api.put(
    `/api/applications/recruiter/${applicationId}/status`, 
    null, // The request has no body, so we pass null or an empty object.
    { 
      params: { 
        status: status // This tells Axios to add "?status=VALUE" to the URL.
      } 
    }
  )

  return response.data
},
}
