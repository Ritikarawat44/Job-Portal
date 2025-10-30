package com.example.jobportal.service;

import com.example.jobportal.model.Application;
import com.example.jobportal.model.Job;
import com.example.jobportal.model.User;
import com.example.jobportal.repository.ApplicationRepository;
import com.example.jobportal.repository.JobRepository;
import com.example.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    public String getUserNameById(Long userId) {
        return userRepository.findById(userId)
                .map(User::getName)
                .orElse("Unknown User");
    }

    public String getJobTitleById(Long jobId) {
        return jobRepository.findById(jobId)
                .map(Job::getTitle)
                .orElse("Unknown Job");
    }

    // Submit a new job application
    public Application applyToJob(Application application) {
        // Set the appliedAt timestamp to now
        application.setAppliedAt(LocalDateTime.now());
        // Initial status is "Pending"
        application.setStatus("Pending");
        return applicationRepository.save(application);
    }
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    // Get all applications by a user
    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    // Get all applications for a job
    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Find application by ID
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
}

