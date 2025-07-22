import { Navigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthStore((state) => state)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RoleBasedRoute
