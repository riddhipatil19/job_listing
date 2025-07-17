package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.JwtResponse;
import com.riddhi.joblisting_backend.dto.LoginRequest;
import com.riddhi.joblisting_backend.dto.SignupRequest;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with email: " + loginRequest.getEmail());
        }

        User user = userOptional.get();

        // Check password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Return JWT response with user details
        return new JwtResponse(user.getName(), user.getEmail());
    }

    public String registerUser(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());  // ← FIXED: Now saving name
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));  // ← FIXED: Now encoding password

        // Save user
        userRepository.save(user);

        return "User registered successfully!";
    }
}
