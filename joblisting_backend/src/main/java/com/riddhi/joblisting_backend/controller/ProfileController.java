package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.CandidateProfileRequest;
import com.riddhi.joblisting_backend.dto.RecruiterProfileRequest;
import com.riddhi.joblisting_backend.model.CandidateProfile;
import com.riddhi.joblisting_backend.model.RecruiterProfile;
import com.riddhi.joblisting_backend.service.ProfileService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@Tag(name = "Profile Controller", description = "Endpoints for Candidate and Recruiter Profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Operation(summary = "Get Candidate Profile", description = "Returns the profile of the currently logged-in candidate")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved candidate profile"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @GetMapping("/candidate")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> getCandidateProfile() {
        CandidateProfile profile = profileService.getCandidateProfile();
        return ResponseEntity.ok(profile);
    }

    @Operation(summary = "Update Candidate Profile", description = "Updates the profile of the currently logged-in candidate")
    @PutMapping("/candidate")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> updateCandidateProfile(@Valid @RequestBody CandidateProfileRequest request) {
        CandidateProfile profile = profileService.updateCandidateProfile(request);
        return ResponseEntity.ok(profile);
    }

    @Operation(summary = "Get Recruiter Profile", description = "Returns the profile of the currently logged-in recruiter")
    @GetMapping("/recruiter")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<RecruiterProfile> getRecruiterProfile() {
        RecruiterProfile profile = profileService.getRecruiterProfile();
        return ResponseEntity.ok(profile);
    }

    @Operation(summary = "Update Recruiter Profile", description = "Updates the profile of the currently logged-in recruiter")
    @PutMapping("/recruiter")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<RecruiterProfile> updateRecruiterProfile(@Valid @RequestBody RecruiterProfileRequest request) {
        RecruiterProfile profile = profileService.updateRecruiterProfile(request);
        return ResponseEntity.ok(profile);
    }
}
