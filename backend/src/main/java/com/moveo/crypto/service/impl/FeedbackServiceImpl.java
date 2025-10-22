package com.moveo.crypto.service.impl;

import com.moveo.crypto.domain.Feedback;
import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.FeedbackDtos;
import com.moveo.crypto.repository.FeedbackRepository;
import com.moveo.crypto.service.FeedbackService;
import org.springframework.stereotype.Service;

/**
 * FeedbackServiceImpl
 * Stores a single vote record. You can extend this with aggregation or deduping.
 */
@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepo;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }

    @Override
    public void submit(User user, FeedbackDtos.FeedbackRequest req) {
        Feedback f = new Feedback();
        f.setUser(user);
        f.setSectionType(req.section);
        f.setContentId(req.contentId);
        f.setVote(req.vote >= 0 ? 1 : -1);
        feedbackRepo.save(f);
    }
}
