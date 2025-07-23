import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Layouts
import PublicLayout from "./layouts/PublicLayout"
import DashboardLayout from "./layouts/DashboardLayout"

// Public Pages
import Landing from "./Pages/Landing"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import JobListings from "./Pages/JobListings"
import JobDetails from "./pages/JobDetails"
import Page404 from "./pages/Page404"

// Protected Pages - Candidate
import CandidateDashboard from "./Pages/candidate/CandidateDashboard"
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

// Store
import useAuthStore from "./store/authStore"

function App() {
  const { user } = useAuthStore((state) => state)
  const navigate = useNavigate()

  // Voice command functionality (from original hackathon project)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef(null)

  const handleVoiceCommand = (command) => {
    console.log("Detected voice command:", command)
    const normalizedCommand = command.replace(/[^a-z0-9]/g, "").toLowerCase()

    if (normalizedCommand.includes("home") || normalizedCommand.includes("landing")) {
      navigate("/")
    } else if (normalizedCommand.includes("jobs")) {
      navigate("/jobs")
    } else if (normalizedCommand.includes("login")) {
      navigate("/login")
    } else if (normalizedCommand.includes("register") || normalizedCommand.includes("signup")) {
      navigate("/register")
    } else if (normalizedCommand.includes("dashboard")) {
      if (user?.role === "CANDIDATE") navigate("/candidate/dashboard")
      else if (user?.role === "RECRUITER") navigate("/recruiter/dashboard")
      else if (user?.role === "ADMIN") navigate("/admin/dashboard")
    }
  }

  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase()
      setTranscript(command)
      handleVoiceCommand(command)
    }

    recognition.onerror = (error) => {
      setTimeout(() => {
        try {
          recognition.start()
        } catch (error) {
          console.warn("Recognition already started, skipping start.")
        }
      }, 1000)
    }

    recognition.onend = () => {
      setTimeout(() => {
        try {
          recognition.start()
        } catch (error) {
          console.warn("Recognition already started, skipping start.")
        }
      }, 1000)
    }

    try {
      recognition.start()
    } catch (error) {
      console.warn("Recognition already started, skipping start.")
    }

    return () => {
      recognition.stop()
    }
  }, [user])

  return (
    <>
      {/* Voice command display */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          zIndex: 999,
        }}
      >
        <p style={{ margin: 0 }}>🎙️ Heard: {transcript}</p>
      </div>

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
