package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.JwtResponse;
import com.riddhi.joblisting_backend.dto.LoginRequest;
import com.riddhi.joblisting_backend.dto.SignupRequest;
import com.riddhi.joblisting_backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication Controller", description = "APIs for login, registration, and logout operations")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticates the user and returns a JWT token")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    @Operation(summary = "Register", description = "Registers a new user and returns a confirmation message")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        String message = authService.registerUser(signUpRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout", description = "Logs out the current user (stateless placeholder)")
    public ResponseEntity<Map<String, String>> logoutUser() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User logged out successfully!");
        return ResponseEntity.ok(response);
    }
}
