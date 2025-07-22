import { create } from "zustand"

const useJobStore = create((set, get) => ({
  // State
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  searchFilters: {
    query: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
  },

  // Actions
  setJobs: (jobs) => set({ jobs }),
  setCurrentJob: (job) => set({ currentJob: job }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    })),

  clearSearchFilters: () =>
    set({
      searchFilters: {
        query: "",
        location: "",
        jobType: "",
        minSalary: "",
        maxSalary: "",
      },
    }),

  addJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
    })),

  updateJob: (updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
      currentJob: state.currentJob?.id === updatedJob.id ? updatedJob : state.currentJob,
    })),

  removeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== jobId),
      currentJob: state.currentJob?.id === jobId ? null : state.currentJob,
    })),
}))

export default useJobStore
