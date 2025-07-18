package com.riddhi.joblisting_backend.service;

import com.riddhi.joblisting_backend.model.Role;
import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.repository.ApplicationRepository;
import com.riddhi.joblisting_backend.repository.JobRepository;
import com.riddhi.joblisting_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCandidates", userRepository.countByRole(Role.CANDIDATE));
        stats.put("totalRecruiters", userRepository.countByRole(Role.RECRUITER));
        stats.put("totalJobs", jobRepository.countActiveJobs());
        stats.put("totalApplications", applicationRepository.countAllApplications());
        
        return stats;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setIsActive(!user.getIsActive());
        return userRepository.save(user);
    }
}
