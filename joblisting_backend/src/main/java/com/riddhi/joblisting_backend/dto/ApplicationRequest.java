package com.riddhi.joblisting_backend.dto;

import jakarta.validation.constraints.NotNull;

public class ApplicationRequest {
    @NotNull
    private Long jobId;

    private String coverLetter;

    // Getters and Setters
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
}
