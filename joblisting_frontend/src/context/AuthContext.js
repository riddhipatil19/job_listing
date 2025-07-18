"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "../utils/axios"

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData) {
            setUser(JSON.parse(userData))
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email, password })
            const { token, ...userData } = response.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(userData))
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setUser(userData)

            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || "Login failed" }
        }
    }

    const register = async (userData) => {
        try {
            await axios.post("/auth/register", userData)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || "Registration failed" }
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        setUser(null)
    }

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
