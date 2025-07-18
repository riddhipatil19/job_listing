package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.JobRequest;
import com.riddhi.joblisting_backend.dto.JobResponse;
import com.riddhi.joblisting_backend.exception.ResourceNotFoundException;
import com.riddhi.joblisting_backend.exception.UnauthorizedException;
import com.riddhi.joblisting_backend.model.Job;
import com.riddhi.joblisting_backend.model.JobStatus;
import com.riddhi.joblisting_backend.model.JobType;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private AuthService authService;

    public List<JobResponse> getAllActiveJobs() {
        return jobRepository.findByStatus(JobStatus.ACTIVE)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<JobResponse> searchJobs(String location, JobType jobType, String skills) {
        return jobRepository.findActiveJobsWithFilters(location, jobType, skills)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public JobResponse createJob(JobRequest jobRequest) {
        User recruiter = authService.getCurrentUser();
        
        Job job = new Job();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setSalary(jobRequest.getSalary());
        job.setJobType(jobRequest.getJobType());
        job.setSkills(jobRequest.getSkills());
        job.setRecruiter(recruiter);
        job.setStatus(JobStatus.ACTIVE);

        Job savedJob = jobRepository.save(job);
        return convertToResponse(savedJob);
    }

    public List<JobResponse> getRecruiterJobs() {
        User recruiter = authService.getCurrentUser();
        return jobRepository.findByRecruiter(recruiter)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public JobResponse updateJob(Long jobId, JobRequest jobRequest) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        User currentUser = authService.getCurrentUser();
        if (!job.getRecruiter().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can only update your own jobs");
        }

        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setSalary(jobRequest.getSalary());
        job.setJobType(jobRequest.getJobType());
        job.setSkills(jobRequest.getSkills());

        Job updatedJob = jobRepository.save(job);
        return convertToResponse(updatedJob);
    }

    public void deleteJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        User currentUser = authService.getCurrentUser();
        if (!job.getRecruiter().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can only delete your own jobs");
        }

        jobRepository.delete(job);
    }

    public JobResponse getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return convertToResponse(job);
    }

    private JobResponse convertToResponse(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setLocation(job.getLocation());
        response.setSalary(job.getSalary());
        response.setJobType(job.getJobType());
        response.setSkills(job.getSkills());
        response.setStatus(job.getStatus());
        response.setCreatedAt(job.getCreatedAt());
        response.setRecruiterId(job.getRecruiter().getId());
        
        if (job.getRecruiter().getRecruiterProfile() != null) {
            response.setRecruiterCompany(job.getRecruiter().getRecruiterProfile().getCompanyName());
        }
        
        return response;
    }
}
