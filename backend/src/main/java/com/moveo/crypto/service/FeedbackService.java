package com.moveo.crypto.service;

import com.moveo.crypto.dto.FeedbackDtos;
import com.moveo.crypto.domain.User;

public interface FeedbackService {
    void submit(User user, FeedbackDtos.FeedbackRequest req);
}
