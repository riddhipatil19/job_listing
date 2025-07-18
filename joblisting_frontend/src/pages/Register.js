"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CANDIDATE",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long")
            setLoading(false)
            return
        }

        // Remove confirmPassword before sending
        const { confirmPassword, ...registerData } = formData

        console.log("Submitting registration data:", registerData)

        const result = await register(registerData)

        if (result.success) {
            alert("Registration successful! Please login.")
            navigate("/login")
        } else {
            setError(result.error)
        }

        setLoading(false)
    }

    return (
        <div className="container">
            <div className="card">
                <h2 className="text-center" style={{ marginBottom: "2rem", color: "#333" }}>
                    Create Your Account
                </h2>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Role</label>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="CANDIDATE">Candidate</option>
                            <option value="RECRUITER">Recruiter</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: "1.5rem" }}>
                    Already have an account?{" "}
                    <Link to="/login" className="link">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
