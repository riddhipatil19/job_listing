package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.CandidateProfileRequest;
import com.riddhi.joblisting_backend.dto.RecruiterProfileRequest;
import com.riddhi.joblisting_backend.model.CandidateProfile;
import com.riddhi.joblisting_backend.model.RecruiterProfile;
import com.riddhi.joblisting_backend.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/candidate")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> getCandidateProfile() {
        CandidateProfile profile = profileService.getCandidateProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/candidate")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> updateCandidateProfile(@Valid @RequestBody CandidateProfileRequest request) {
        CandidateProfile profile = profileService.updateCandidateProfile(request);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<RecruiterProfile> getRecruiterProfile() {
        RecruiterProfile profile = profileService.getRecruiterProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<RecruiterProfile> updateRecruiterProfile(@Valid @RequestBody RecruiterProfileRequest request) {
        RecruiterProfile profile = profileService.updateRecruiterProfile(request);
        return ResponseEntity.ok(profile);
    }
}
