package com.riddhi.joblisting_backend.repository;

import com.riddhi.joblisting_backend.model.Role;
import com.riddhi.joblisting_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(Role role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    Long countByRole(Role role);
}
