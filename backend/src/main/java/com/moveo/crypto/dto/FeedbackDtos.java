package com.moveo.crypto.dto;

import com.moveo.crypto.domain.SectionType;
import jakarta.validation.constraints.NotNull;

/** DTOs for feedback submission. */
public class FeedbackDtos {
    public static class FeedbackRequest {
        @NotNull public SectionType section;   // ← enum, לא String
        @NotNull public String contentId;
        /** +1 like, -1 dislike */
        public int vote;
    }
}
