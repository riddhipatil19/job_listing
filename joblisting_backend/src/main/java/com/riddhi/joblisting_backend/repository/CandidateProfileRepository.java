package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.CandidateProfile;
import com.riddhi.joblisting_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByUser(User user);
}
