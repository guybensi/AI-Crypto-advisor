package com.moveo.crypto.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * DashboardContent Entity
 * Stores a daily snapshot of curated content per user.
 * This lets us cache API results and serve consistent content for a given date.
 */
@Entity
@Table(name = "dashboard_content", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "date"}))
public class DashboardContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate date;

    /** JSON strings for each section for flexibility. */
    @Lob
    private String marketNewsJson;

    @Lob
    private String coinPricesJson;

    @Lob
    private String aiInsightJson;

    private String memeUrl;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getMarketNewsJson() { return marketNewsJson; }
    public void setMarketNewsJson(String marketNewsJson) { this.marketNewsJson = marketNewsJson; }

    public String getCoinPricesJson() { return coinPricesJson; }
    public void setCoinPricesJson(String coinPricesJson) { this.coinPricesJson = coinPricesJson; }

    public String getAiInsightJson() { return aiInsightJson; }
    public void setAiInsightJson(String aiInsightJson) { this.aiInsightJson = aiInsightJson; }

    public String getMemeUrl() { return memeUrl; }
    public void setMemeUrl(String memeUrl) { this.memeUrl = memeUrl; }
}
