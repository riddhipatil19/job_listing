package com.riddhi.joblisting_backend.dto;

public class RecruiterProfileRequest {
    private String companyName;
    private String about;
    private String contactPerson;
    private String phone;

    // Getters and Setters
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
