package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.Job;
import com.riddhi.joblisting_backend.model.JobStatus;
import com.riddhi.joblisting_backend.model.JobType;
import com.riddhi.joblisting_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByRecruiter(User recruiter);
    List<Job> findByStatus(JobStatus status);
    
    @Query("SELECT j FROM Job j WHERE j.status = 'ACTIVE' AND " +
           "(:location IS NULL OR j.location LIKE %:location%) AND " +
           "(:jobType IS NULL OR j.jobType = :jobType) AND " +
           "(:skills IS NULL OR j.skills LIKE %:skills%)")
    List<Job> findActiveJobsWithFilters(@Param("location") String location,
                                       @Param("jobType") JobType jobType,
                                       @Param("skills") String skills);
    
    @Query("SELECT COUNT(j) FROM Job j WHERE j.status = 'ACTIVE'")
    Long countActiveJobs();
}
