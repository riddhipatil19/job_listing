"use client"

import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Welcome = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h1 className="welcome-title">Welcome, {user?.name || user?.email}! 🎉</h1>
                <p className="welcome-subtitle">You have successfully logged into the Job Portal system.</p>

                <div style={{ marginBottom: "2rem" }}>
                    <p style={{ color: "#666", fontSize: "1rem" }}>
                        <strong>Email:</strong> {user?.email}
                    </p>
                    <p style={{ color: "#666", fontSize: "1rem" }}>
                        <strong>Role:</strong> {user?.role || "User"}
                    </p>
                    <p style={{ color: "#666", fontSize: "1rem" }}>
                        <strong>Login Time:</strong> {new Date().toLocaleString()}
                    </p>
                </div>

                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Welcome
