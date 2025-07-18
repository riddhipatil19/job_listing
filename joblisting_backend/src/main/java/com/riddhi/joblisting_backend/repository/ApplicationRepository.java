package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.Application;
import com.riddhi.joblisting_backend.model.Job;
import com.riddhi.joblisting_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByCandidate(User candidate);
    List<Application> findByJob(Job job);
    Optional<Application> findByJobAndCandidate(Job job, User candidate);
    
    @Query("SELECT COUNT(a) FROM Application a")
    Long countAllApplications();
    
    @Query("SELECT a FROM Application a WHERE a.job.recruiter = :recruiter")
    List<Application> findByRecruiter(User recruiter);
}
