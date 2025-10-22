package com.moveo.crypto.controller;

import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.DashboardDtos;
import com.moveo.crypto.repository.UserRepository;
import com.moveo.crypto.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * DashboardController
 * Returns the daily dashboard for a user (identified by email for demo).
 * Replace with JWT principal extraction in production.
 */
@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepo;

    public DashboardController(DashboardService dashboardService, UserRepository userRepo) {
        this.dashboardService = dashboardService;
        this.userRepo = userRepo;
    }

    @GetMapping("/daily")
    public ResponseEntity<DashboardDtos.DashboardResponse> daily(@RequestParam String email) {
        User u = userRepo.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(dashboardService.getDailyDashboard(u));
    }
}
