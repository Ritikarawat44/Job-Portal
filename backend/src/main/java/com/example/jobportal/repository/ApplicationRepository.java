package com.example.jobportal.repository;

import com.example.jobportal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Find all applications by user ID
    List<Application> findByUserId(Long userId);

    // Find all applications for a specific job ID
    List<Application> findByJobId(Long jobId);
}
