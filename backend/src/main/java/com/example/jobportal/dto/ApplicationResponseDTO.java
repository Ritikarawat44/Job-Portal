package com.example.jobportal.dto;

public class ApplicationResponseDTO {
    private Long id;
    private String userName;
    private String jobTitle;
    private String status;
    private String appliedAt;

    public ApplicationResponseDTO(Long id, String userName, String jobTitle, String status, String appliedAt) {
        this.id = id;
        this.userName = userName;
        this.jobTitle = jobTitle;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAppliedAt() { return appliedAt; }
    public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }
}
