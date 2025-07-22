package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.JobResponse;
import com.riddhi.joblisting_backend.dto.JobRequest;
import com.riddhi.joblisting_backend.model.JobType;
import com.riddhi.joblisting_backend.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/jobs")
@Tag(name = "Jobs", description = "Endpoints for job listing and management")
public class JobController {

    @Autowired
    private JobService jobService;

    @Operation(summary = "Get all public jobs", description = "Fetch all active jobs available to everyone")
    @GetMapping("/public")
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        List<JobResponse> jobs = jobService.getAllActiveJobs();
        return ResponseEntity.ok(jobs);
    }

    @Operation(summary = "Search jobs", description = "Search jobs by location, job type, or skills")
    @GetMapping("/public/search")
    public ResponseEntity<List<JobResponse>> searchJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) String skills) {
        List<JobResponse> jobs = jobService.searchJobs(location, jobType, skills);
        return ResponseEntity.ok(jobs);
    }

    @Operation(summary = "Get job by ID", description = "Fetch a single job by its ID")
    @GetMapping("/public/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }

    @Operation(summary = "Create job", description = "Recruiter creates a new job post")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("/recruiter")
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest jobRequest) {
        JobResponse job = jobService.createJob(jobRequest);
        return ResponseEntity.ok(job);
    }

    @Operation(summary = "Get recruiter's jobs", description = "List all jobs created by the logged-in recruiter")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/recruiter")
    public ResponseEntity<List<JobResponse>> getRecruiterJobs() {
        List<JobResponse> jobs = jobService.getRecruiterJobs();
        return ResponseEntity.ok(jobs);
    }

    @Operation(summary = "Update job", description = "Recruiter updates a job post")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/recruiter/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequest jobRequest) {
        JobResponse job = jobService.updateJob(id, jobRequest);
        return ResponseEntity.ok(job);
    }

    @Operation(summary = "Delete job", description = "Recruiter deletes a job post")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("/recruiter/{id}")
    public ResponseEntity<Map<String, String>> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Job deleted successfully");
        return ResponseEntity.ok(response);
    }
}
