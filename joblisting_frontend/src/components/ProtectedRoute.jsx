import { Navigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isTokenExpired } = useAuthStore((state) => state)

  if (!isLoggedIn || isTokenExpired()) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
