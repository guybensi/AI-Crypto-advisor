package com.moveo.crypto.controller;

import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.OnboardingDtos;
import com.moveo.crypto.repository.UserRepository;
import com.moveo.crypto.service.OnboardingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * OnboardingController
 * Saves preferences for a given user (for demo we use email parameter).
 * In production, extract user from JWT.
 */
@RestController
@RequestMapping("/onboarding")
@CrossOrigin
public class OnboardingController {

    private final OnboardingService onboardingService;
    private final UserRepository userRepo;

    public OnboardingController(OnboardingService onboardingService, UserRepository userRepo) {
        this.onboardingService = onboardingService;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestParam String email,
                                     @RequestBody @Valid OnboardingDtos.OnboardingRequest req) {
        User u = userRepo.findByEmail(email).orElseThrow();
        onboardingService.savePreferences(u, req);
        return ResponseEntity.ok().build();
    }
}
