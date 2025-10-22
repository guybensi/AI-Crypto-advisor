package com.moveo.crypto.domain;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Feedback Entity
 * Stores a thumbs up/down for a specific section/content record.
 * vote = +1 (like), -1 (dislike).
 */
@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private SectionType sectionType;

    /** A content identifier (e.g., URL, news ID, coin symbol) */
    private String contentId;

    private int vote;

    private Instant createdAt = Instant.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public SectionType getSectionType() { return sectionType; }
    public void setSectionType(SectionType sectionType) { this.sectionType = sectionType; }

    public String getContentId() { return contentId; }
    public void setContentId(String contentId) { this.contentId = contentId; }

    public int getVote() { return vote; }
    public void setVote(int vote) { this.vote = vote; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
