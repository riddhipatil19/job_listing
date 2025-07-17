"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth()

    if (loading) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute
