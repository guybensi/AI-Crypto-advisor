package com.moveo.crypto.dto;

import com.moveo.crypto.domain.InvestorType;
import jakarta.validation.constraints.NotNull;

/**
 * DTOs for onboarding.
 */
public class OnboardingDtos {
    public static class OnboardingRequest {
        /** Comma-separated assets, e.g., "BTC,ETH,SOL" */
        @NotNull public String cryptoAssets;
        @NotNull public InvestorType investorType;
        /** Comma-separated content types, e.g., "MARKET_NEWS,CHARTS" */
        @NotNull public String contentTypes;
    }
}
