package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.RecruiterProfile;
import com.riddhi.joblisting_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    Optional<RecruiterProfile> findByUser(User user);
}
