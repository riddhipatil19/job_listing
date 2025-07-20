package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.ApplicationRequest;
import com.riddhi.joblisting_backend.dto.ApplicationResponse;
import com.riddhi.joblisting_backend.model.ApplicationStatus;
import com.riddhi.joblisting_backend.service.ApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Application Controller", description = "APIs for job application operations by candidates and recruiters")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/candidate/apply")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Apply for a job", description = "Allows a candidate to apply for a job using job ID and message")
    public ResponseEntity<ApplicationResponse> applyForJob(@Valid @RequestBody ApplicationRequest applicationRequest) {
        ApplicationResponse application = applicationService.applyForJob(applicationRequest);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/candidate")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('CANDIDATE')")
    @Operation(summary = "Get candidate's applications", description = "Returns a list of all job applications submitted by the logged-in candidate")
    public ResponseEntity<List<ApplicationResponse>> getCandidateApplications() {
        List<ApplicationResponse> applications = applicationService.getCandidateApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/recruiter/job/{jobId}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Get applications for a job", description = "Returns applications submitted for a specific job (by jobId) to the recruiter")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(@PathVariable Long jobId) {
        List<ApplicationResponse> applications = applicationService.getJobApplications(jobId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/recruiter")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Get all applications for recruiter", description = "Returns all job applications received by the logged-in recruiter")
    public ResponseEntity<List<ApplicationResponse>> getRecruiterApplications() {
        List<ApplicationResponse> applications = applicationService.getRecruiterApplications();
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/recruiter/{applicationId}/status")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Update application status", description = "Allows recruiter to update the status of an application (ACCEPTED, REJECTED, etc.)")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {
        ApplicationResponse application = applicationService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(application);
    }
}
