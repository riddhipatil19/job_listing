package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.JwtResponse;
import com.riddhi.joblisting_backend.dto.LoginRequest;
import com.riddhi.joblisting_backend.dto.SignupRequest;
import com.riddhi.joblisting_backend.exception.ResourceNotFoundException;
import com.riddhi.joblisting_backend.model.CandidateProfile;
import com.riddhi.joblisting_backend.model.RecruiterProfile;
import com.riddhi.joblisting_backend.model.Role;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.CandidateProfileRepository;
import com.riddhi.joblisting_backend.repository.RecruiterProfileRepository;
import com.riddhi.joblisting_backend.repository.UserRepository;
import com.riddhi.joblisting_backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CandidateProfileRepository candidateProfileRepository;

    @Autowired
    RecruiterProfileRepository recruiterProfileRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();

        return new JwtResponse(jwt, user.getId(), user.getEmail(), user.getRole());
    }

    public String registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already taken!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(),signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getRole());

        userRepository.save(user);

        // Create profile based on role
        if (signUpRequest.getRole() == Role.CANDIDATE) {
            CandidateProfile profile = new CandidateProfile();
            profile.setUser(user);
            candidateProfileRepository.save(profile);
        } else if (signUpRequest.getRole() == Role.RECRUITER) {
            RecruiterProfile profile = new RecruiterProfile();
            profile.setUser(user);
            recruiterProfileRepository.save(profile);
        }

        return "User registered successfully!";
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
