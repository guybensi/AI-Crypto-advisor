package com.moveo.crypto.controller;

import com.moveo.crypto.dto.FeedbackDtos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback") // ← נתיב תואם לפרונט
@CrossOrigin
public class FeedbackController {

    @PostMapping
    public ResponseEntity<?> submit(@RequestBody FeedbackDtos.FeedbackRequest body, @RequestParam(required = false) String email) {
        System.out.printf("Feedback from %s: section=%s id=%s vote=%d%n",
                email, body.section, body.contentId, body.vote);
        return ResponseEntity.ok().body(java.util.Map.of("ok", true));
    }
}
