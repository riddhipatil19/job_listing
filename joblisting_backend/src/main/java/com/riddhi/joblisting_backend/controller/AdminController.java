package com.riddhi.joblisting_backend.controller;

import com.riddhi.joblisting_backend.model.User;
import com.riddhi.joblisting_backend.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/admin")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Controller", description = "APIs for admin operations like managing users and viewing dashboard stats")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard stats", description = "Returns stats like number of users, jobs, applications, etc.")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}/toggle-status")
    @Operation(summary = "Toggle user status", description = "Enable or disable a user's account based on their current status")
    public ResponseEntity<User> toggleUserStatus(@PathVariable Long userId) {
        User user = adminService.toggleUserStatus(userId);
        return ResponseEntity.ok(user);
    }
}
