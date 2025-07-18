package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.dto.JobResponse;
import com.riddhi.joblisting_backend.dto.JobRequest;
import com.riddhi.joblisting_backend.model.JobType;
import com.riddhi.joblisting_backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/public")
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        List<JobResponse> jobs = jobService.getAllActiveJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<JobResponse>> searchJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) String skills) {
        List<JobResponse> jobs = jobService.searchJobs(location, jobType, skills);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }

    @PostMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest jobRequest) {
        JobResponse job = jobService.createJob(jobRequest);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<List<JobResponse>> getRecruiterJobs() {
        List<JobResponse> jobs = jobService.getRecruiterJobs();
        return ResponseEntity.ok(jobs);
    }

    @PutMapping("/recruiter/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequest jobRequest) {
        JobResponse job = jobService.updateJob(id, jobRequest);
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/recruiter/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Map<String, String>> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Job deleted successfully");
        return ResponseEntity.ok(response);
    }
}
