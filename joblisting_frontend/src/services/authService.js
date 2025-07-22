import api from "./api"

export const authService = {
  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials)
    return response.data
  },

  logout: async () => {
    const response = await api.post("/api/auth/logout")
    return response.data
  },
}
