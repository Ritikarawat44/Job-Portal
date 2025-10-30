package com.example.jobportal.controller;
import com.example.jobportal.dto.ApplicationResponseDTO;
import com.example.jobportal.model.Application;
import com.example.jobportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Endpoint to apply for a job
    @PostMapping("/apply")
    public ResponseEntity<Application> applyToJob(@RequestBody Application application) {
        Application savedApplication = applicationService.applyToJob(application);
        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    // Get all applications made by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable Long userId) {
        List<Application> applications = applicationService.getApplicationsByUserId(userId);
        if (applications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    // Get all applications for a job (for recruiters)
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJob(@PathVariable Long jobId) {
        List<Application> applications = applicationService.getApplicationsByJobId(jobId);
        if (applications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    // Get application details by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable Long id) {
        Optional<Application> application = applicationService.getApplicationById(id);
        if (application.isPresent()) {
            return ResponseEntity.ok(application.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<ApplicationResponseDTO>> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();

        List<ApplicationResponseDTO> response = applications.stream().map(app -> {
            String userName = applicationService.getUserNameById(app.getUserId());
            String jobTitle = applicationService.getJobTitleById(app.getJobId());
            return new ApplicationResponseDTO(
                    app.getId(),
                    userName,
                    jobTitle,
                    app.getStatus(),
                    app.getAppliedAt().toString()
            );
        }).toList();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
