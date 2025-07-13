package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.JwtResponse;
import com.riddhi.joblisting_backend.dto.LoginRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public JwtResponse authenticateUser(LoginRequest loginRequest){
        return new JwtResponse(loginRequest.getEmail());
    }
}
