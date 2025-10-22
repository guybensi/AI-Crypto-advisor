package com.moveo.crypto.service.impl;

import com.moveo.crypto.domain.User;
import com.moveo.crypto.domain.UserPreference;
import com.moveo.crypto.dto.OnboardingDtos;
import com.moveo.crypto.repository.UserPreferenceRepository;
import com.moveo.crypto.service.OnboardingService;
import org.springframework.stereotype.Service;

/**
 * OnboardingServiceImpl
 * Saves user preferences after the onboarding quiz.
 */
@Service
public class OnboardingServiceImpl implements OnboardingService {

    private final UserPreferenceRepository prefRepo;

    public OnboardingServiceImpl(UserPreferenceRepository prefRepo) {
        this.prefRepo = prefRepo;
    }

    @Override
    public void savePreferences(User user, OnboardingDtos.OnboardingRequest req) {
        UserPreference pref = prefRepo.findByUser(user).orElse(new UserPreference());
        pref.setUser(user);
        pref.setCryptoAssets(req.cryptoAssets);
        pref.setInvestorType(req.investorType);
        pref.setContentTypes(req.contentTypes);
        prefRepo.save(pref);
    }
}
