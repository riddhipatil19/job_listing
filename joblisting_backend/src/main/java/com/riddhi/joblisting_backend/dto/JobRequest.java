package com.riddhi.joblisting_backend.dto;

import com.riddhi.joblisting_backend.model.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class JobRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String location;

    private BigDecimal salary;

    @NotNull
    private JobType jobType;

    private String skills;

    // Getters and Setters
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
}
