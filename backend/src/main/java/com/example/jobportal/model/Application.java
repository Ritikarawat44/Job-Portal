package com.example.jobportal.model;

import jakarta.persistence.*;

//import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign key to User (applicant)
    @Column(nullable = false)
    private Long userId;

    // Foreign key to Job
    @Column(nullable = false)
    private Long jobId;

    @Column(nullable = false)
    private LocalDateTime appliedAt;

    @Column(nullable = false)
    private String status;  // e.g., "Pending", "Accepted", "Rejected"

    public Application() {}

    public Application(Long userId, Long jobId, LocalDateTime appliedAt, String status) {
        this.userId = userId;
        this.jobId = jobId;
        this.appliedAt = appliedAt;
        this.status = status;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
