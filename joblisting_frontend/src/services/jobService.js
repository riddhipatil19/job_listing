import api from "./api"

export const jobService = {
  // Public endpoints
  getAllJobs: async () => {
    const response = await api.get("/api/jobs/public")
    return response.data
  },

  getJobById: async (id) => {
    const response = await api.get(`/api/jobs/public/${id}`)
    return response.data
  },

  searchJobs: async (params) => {
    const response = await api.get("/api/jobs/public/search", { params })
    return response.data
  },

  // Recruiter endpoints
  getRecruiterJobs: async () => {
    const response = await api.get("/api/jobs/recruiter")
    return response.data
  },

  createJob: async (jobData) => {
    const response = await api.post("/api/jobs/recruiter", jobData)
    return response.data
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/api/jobs/recruiter/${id}`, jobData)
    return response.data
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/api/jobs/recruiter/${id}`)
    return response.data
  },
}
