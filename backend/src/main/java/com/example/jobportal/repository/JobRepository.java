package com.example.jobportal.repository;

import com.example.jobportal.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Find all jobs posted by a specific recruiter email
    List<Job> findByPostedByEmail(String email);
    // Add this to JobRepository.java
    @Query("SELECT j FROM Job j WHERE " +
            "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Job> searchJobs(@Param("keyword") String keyword, @Param("location") String location);
}
