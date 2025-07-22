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

  updateApplicationStatus: async (applicationId, status) => {
    console.log("Updating application status:", { applicationId, status })
    const response = await api.put(`/api/applications/recruiter/${applicationId}/status`, { status })
    return response.data
  },
}
