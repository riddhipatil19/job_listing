import { Routes, Route } from "react-router-dom" // Removed useNavigate
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layouts
import PublicLayout from "./layouts/PublicLayout"
import DashboardLayout from "./layouts/DashboardLayout"

// Public Pages
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import JobListings from "./pages/JobListings"
import JobDetails from "./pages/JobDetails"
import Page404 from "./pages/Page404"

// Protected Pages - Candidate
import CandidateDashboard from "./pages/candidate/CandidateDashboard"
import CandidateApplications from "./pages/candidate/CandidateApplications"
import CandidateProfile from "./pages/candidate/CandidateProfile"

// Protected Pages - Recruiter
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard"
import RecruiterJobs from "./pages/recruiter/RecruiterJobs"
import CreateJob from "./pages/recruiter/CreateJob"
import EditJob from "./pages/recruiter/EditJob"
import JobApplications from "./pages/recruiter/JobApplications"
import RecruiterProfile from "./pages/recruiter/RecruiterProfile"

// Protected Pages - Admin
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"

// Components
import ProtectedRoute from "./components/ProtectedRoute"
import RoleBasedRoute from "./components/RoleBasedRoute"

// NOTE: The useAuthStore import is no longer needed in this specific file
// as the 'user' object was only used for the voice command feature.
// However, you can leave it if you plan to use it for other features here.
// import useAuthStore from "./store/authStore"

function App() {
  // All voice command state, refs, and functions have been removed.

  return (
    <>
      {/* The voice command display div has been removed. */}

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        {/* Protected Routes - Candidate */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["CANDIDATE"]}>
                  <CandidateDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/applications"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["CANDIDATE"]}>
                  <CandidateApplications />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["CANDIDATE"]}>
                  <CandidateProfile />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Routes - Recruiter */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <RecruiterDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <RecruiterJobs />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/create"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <CreateJob />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/edit/:id"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <EditJob />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/jobs/:jobId/applications"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <JobApplications />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/profile"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["RECRUITER"]}>
                  <RecruiterProfile />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Routes - Admin */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["ADMIN"]}>
                  <AdminUsers />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App