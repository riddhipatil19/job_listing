package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.CandidateProfileRequest;
import com.riddhi.joblisting_backend.dto.RecruiterProfileRequest;
import com.riddhi.joblisting_backend.exception.ResourceNotFoundException;
import com.riddhi.joblisting_backend.model.CandidateProfile;
import com.riddhi.joblisting_backend.model.RecruiterProfile;
import com.riddhi.joblisting_backend.model.Role;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.CandidateProfileRepository;
import com.riddhi.joblisting_backend.repository.RecruiterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    @Autowired
    private RecruiterProfileRepository recruiterProfileRepository;

    @Autowired
    private AuthService authService;

    public CandidateProfile updateCandidateProfile(CandidateProfileRequest request) {
        User user = authService.getCurrentUser();
        if (user.getRole() != Role.CANDIDATE) {
            throw new RuntimeException("Only candidates can update candidate profile");
        }

        CandidateProfile profile = candidateProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found"));

        profile.setFullName(request.getFullName());
        profile.setPhone(request.getPhone());
        profile.setBio(request.getBio());
        profile.setSkills(request.getSkills());
        profile.setEducation(request.getEducation());

        return candidateProfileRepository.save(profile);
    }

    public CandidateProfile getCandidateProfile() {
        User user = authService.getCurrentUser();
        return candidateProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found"));
    }

    public RecruiterProfile updateRecruiterProfile(RecruiterProfileRequest request) {
        User user = authService.getCurrentUser();
        if (user.getRole() != Role.RECRUITER) {
            throw new RuntimeException("Only recruiters can update recruiter profile");
        }

        RecruiterProfile profile = recruiterProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));

        profile.setCompanyName(request.getCompanyName());
        profile.setAbout(request.getAbout());
        profile.setContactPerson(request.getContactPerson());
        profile.setPhone(request.getPhone());

        return recruiterProfileRepository.save(profile);
    }

    public RecruiterProfile getRecruiterProfile() {
        User user = authService.getCurrentUser();
        return recruiterProfileRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
    }
}
