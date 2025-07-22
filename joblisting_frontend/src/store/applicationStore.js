import { create } from "zustand"

const useApplicationStore = create((set, get) => ({
  // State
  applications: [],
  jobApplications: [], // For recruiters viewing applications for their jobs
  loading: false,
  error: null,

  // Actions
  setApplications: (applications) => set({ applications }),
  setJobApplications: (applications) => set({ jobApplications: applications }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addApplication: (application) =>
    set((state) => ({
      applications: [application, ...state.applications],
    })),

  updateApplicationStatus: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((app) => (app.id === applicationId ? { ...app, status } : app)),
      jobApplications: state.jobApplications.map((app) => (app.id === applicationId ? { ...app, status } : app)),
    })),

  clearApplications: () =>
    set({
      applications: [],
      jobApplications: [],
    }),
}))

export default useApplicationStore
