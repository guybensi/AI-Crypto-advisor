package com.moveo.crypto.dto;

import com.moveo.crypto.domain.SectionType;
import jakarta.validation.constraints.NotNull;

/**
 * DTOs for feedback submission.
 */
public class FeedbackDtos {
    public static class FeedbackRequest {
        @NotNull public SectionType section;
        @NotNull public String contentId;
        /** +1 for like, -1 for dislike */
        public int vote;
    }
}
