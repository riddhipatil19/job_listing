import api from "./api"

export const adminService = {
  getAllUsers: async () => {
    const response = await api.get("/api/admin/users")
    return response.data
  },

  getDashboardStats: async () => {
    const response = await api.get("/api/admin/dashboard")
    return response.data
  },

  toggleUserStatus: async (userId) => {
    const response = await api.put(`/api/admin/users/${userId}/toggle-status`)
    return response.data
  },
}
