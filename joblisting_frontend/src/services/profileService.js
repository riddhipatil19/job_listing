import api from "./api"

export const profileService = {
  // Candidate profile
  getCandidateProfile: async () => {
    const response = await api.get("/api/profile/candidate")
    return response.data
  },

  updateCandidateProfile: async (profileData) => {
    const response = await api.put("/api/profile/candidate", profileData)
    return response.data
  },

  // Recruiter profile
  getRecruiterProfile: async () => {
    const response = await api.get("/api/profile/recruiter")
    return response.data
  },

  updateRecruiterProfile: async (profileData) => {
    const response = await api.put("/api/profile/recruiter", profileData)
    return response.data
  },
}
