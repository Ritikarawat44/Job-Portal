package com.example.jobportal.controller;

import com.example.jobportal.model.Job;
import com.example.jobportal.model.User;
import com.example.jobportal.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String location) {

        List<Job> jobs = jobService.searchJobs(q, location);
        return ResponseEntity.ok(jobs);
    }

    // ✅ Only Recruiters can add jobs
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('RECRUITER')")
    public ResponseEntity<?> postJob(@RequestBody Job job, Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User recruiter)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

        job.setPostedByEmail(recruiter.getEmail());
        Job savedJob = jobService.postJob(job);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }


    @GetMapping("/recruiter/{email}")
    public ResponseEntity<List<Job>> getJobsByRecruiter(@PathVariable String email) {
        List<Job> jobs = jobService.getJobsByRecruiterEmail(email);
        if (jobs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobService.getJobById(id);
        return job.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        if (jobs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }
}

