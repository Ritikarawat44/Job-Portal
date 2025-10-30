package com.example.jobportal.service;

import com.example.jobportal.model.Job;
import com.example.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Add this method to JobService.java
    public List<Job> searchJobs(String keyword, String location) {
        return jobRepository.searchJobs(keyword, location);
    }
    // Create or Post a new job
    public Job postJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all jobs posted by a recruiter via email
    public List<Job> getJobsByRecruiterEmail(String email) {
        return jobRepository.findByPostedByEmail(email);
    }

    // Get job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Get all jobs (optional helper method)
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}

