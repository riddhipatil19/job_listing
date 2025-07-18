package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.ApplicationRequest;
import com.riddhi.joblisting_backend.dto.ApplicationResponse;
import com.riddhi.joblisting_backend.model.ApplicationStatus;
import com.riddhi.joblisting_backend.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/candidate/apply")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<ApplicationResponse> applyForJob(@Valid @RequestBody ApplicationRequest applicationRequest) {
        ApplicationResponse application = applicationService.applyForJob(applicationRequest);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/candidate")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<ApplicationResponse>> getCandidateApplications() {
        List<ApplicationResponse> applications = applicationService.getCandidateApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/recruiter/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(@PathVariable Long jobId) {
        List<ApplicationResponse> applications = applicationService.getJobApplications(jobId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<List<ApplicationResponse>> getRecruiterApplications() {
        List<ApplicationResponse> applications = applicationService.getRecruiterApplications();
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/recruiter/{applicationId}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {
        ApplicationResponse application = applicationService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(application);
    }
}
