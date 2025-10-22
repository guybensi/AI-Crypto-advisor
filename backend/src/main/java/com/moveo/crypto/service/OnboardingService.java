package com.moveo.crypto.service;

import com.moveo.crypto.dto.OnboardingDtos;
import com.moveo.crypto.domain.User;

public interface OnboardingService {
    void savePreferences(User user, OnboardingDtos.OnboardingRequest req);
}
