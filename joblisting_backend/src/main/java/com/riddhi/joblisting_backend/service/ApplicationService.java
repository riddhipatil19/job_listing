package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.dto.ApplicationRequest;
import com.riddhi.joblisting_backend.dto.ApplicationResponse;
import com.riddhi.joblisting_backend.exception.ResourceNotFoundException;
import com.riddhi.joblisting_backend.exception.UnauthorizedException;
import com.riddhi.joblisting_backend.model.Application;
import com.riddhi.joblisting_backend.model.ApplicationStatus;
import com.riddhi.joblisting_backend.model.Job;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.ApplicationRepository;
import com.riddhi.joblisting_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private AuthService authService;

    public ApplicationResponse applyForJob(ApplicationRequest applicationRequest) {
        User candidate = authService.getCurrentUser();
        Job job = jobRepository.findById(applicationRequest.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        // Check if already applied
        Optional<Application> existingApplication = applicationRepository.findByJobAndCandidate(job, candidate);
        if (existingApplication.isPresent()) {
            throw new RuntimeException("You have already applied for this job");
        }

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setCoverLetter(applicationRequest.getCoverLetter());
        application.setStatus(ApplicationStatus.APPLIED);

        Application savedApplication = applicationRepository.save(application);
        return convertToResponse(savedApplication);
    }

    public List<ApplicationResponse> getCandidateApplications() {
        User candidate = authService.getCurrentUser();
        return applicationRepository.findByCandidate(candidate)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getJobApplications(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        User currentUser = authService.getCurrentUser();
        if (!job.getRecruiter().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can only view applications for your own jobs");
        }

        return applicationRepository.findByJob(job)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getRecruiterApplications() {
        User recruiter = authService.getCurrentUser();
        return applicationRepository.findByRecruiter(recruiter)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        User currentUser = authService.getCurrentUser();
        if (!application.getJob().getRecruiter().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You can only update applications for your own jobs");
        }

        application.setStatus(status);
        Application updatedApplication = applicationRepository.save(application);
        return convertToResponse(updatedApplication);
    }

    private ApplicationResponse convertToResponse(Application application) {
        ApplicationResponse response = new ApplicationResponse();
        response.setId(application.getId());
        response.setJobId(application.getJob().getId());
        response.setJobTitle(application.getJob().getTitle());
        response.setCandidateEmail(application.getCandidate().getEmail());
        response.setStatus(application.getStatus());
        response.setAppliedAt(application.getAppliedAt());
        response.setCoverLetter(application.getCoverLetter());
        
        if (application.getCandidate().getCandidateProfile() != null) {
            response.setCandidateName(application.getCandidate().getCandidateProfile().getFullName());
        }
        
        return response;
    }
}
