package com.riddhi.joblisting_backend.dto;

import com.riddhi.joblisting_backend.model.JobStatus;
import com.riddhi.joblisting_backend.model.JobType;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal salary;
    private JobType jobType;
    private String skills;
    private JobStatus status;
    private LocalDateTime createdAt;
    private String recruiterCompany;
    private Long recruiterId;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }

    public JobType getJobType() { return jobType; }
    public void setJobType(JobType jobType) { this.jobType = jobType; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getRecruiterCompany() { return recruiterCompany; }
    public void setRecruiterCompany(String recruiterCompany) { this.recruiterCompany = recruiterCompany; }

    public Long getRecruiterId() { return recruiterId; }
    public void setRecruiterId(Long recruiterId) { this.recruiterId = recruiterId; }
}
