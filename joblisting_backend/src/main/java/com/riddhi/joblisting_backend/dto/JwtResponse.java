package com.riddhi.joblisting_backend.dto;

public class JwtResponse {
    private String token = "mock-token-123456";
    private String email;

    public JwtResponse(String email){
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
