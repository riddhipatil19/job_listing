package com.riddhi.joblisting_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "candidate_profiles")
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @Column(length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 500)
    private String skills;

    @Column(length = 200)
    private String education;

    @Column(length = 255)
    private String resumeUrl;

    // Constructors
    public CandidateProfile() {}

    public CandidateProfile(User user, String fullName, String phone, String bio, String skills, String education, String resumeUrl) {
        this.user = user;
        this.fullName = fullName;
        this.phone = phone;
        this.bio = bio;
        this.skills = skills;
        this.education = education;
        this.resumeUrl = resumeUrl;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}
