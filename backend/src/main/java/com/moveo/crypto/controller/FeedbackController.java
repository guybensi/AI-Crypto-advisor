package com.moveo.crypto.controller;

import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.FeedbackDtos;
import com.moveo.crypto.repository.UserRepository;
import com.moveo.crypto.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * FeedbackController
 * Accepts up/down votes for dashboard sections.
 */
@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final UserRepository userRepo;

    public FeedbackController(FeedbackService feedbackService, UserRepository userRepo) {
        this.feedbackService = feedbackService;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<Void> submit(@RequestParam String email,
                                       @RequestBody @Valid FeedbackDtos.FeedbackRequest req) {
        User u = userRepo.findByEmail(email).orElseThrow();
        feedbackService.submit(u, req);
        return ResponseEntity.ok().build();
    }
}
