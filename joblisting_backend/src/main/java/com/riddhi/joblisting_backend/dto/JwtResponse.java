package com.riddhi.joblisting_backend.dto;

public class JwtResponse {
    private String token = "mock-token-123456";
    private String name;
    private String email;
    private String role = "USER";

    // Default constructor
    public JwtResponse() {}

    // Constructor
    public JwtResponse(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Constructor with role
    public JwtResponse(String name, String email, String role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
