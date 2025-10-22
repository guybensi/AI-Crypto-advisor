package com.moveo.crypto.domain;

import jakarta.persistence.*;
import java.util.Set;

/**
 * UserPreference Entity
 * Stores onboarding answers. Uses strings/JSON for simplicity and flexibility.
 * You can convert these to normalized tables if needed.
 */
@Entity
@Table(name = "user_preferences")
public class UserPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /** Comma-separated list of crypto assets (e.g., "BTC,ETH,SOL"). */
    @Column(length = 512)
    private String cryptoAssets;

    /** Enum of investor type. */
    @Enumerated(EnumType.STRING)
    private InvestorType investorType;

    /** Comma-separated list of content types (e.g., "MARKET_NEWS,CHARTS"). */
    @Column(length = 256)
    private String contentTypes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCryptoAssets() { return cryptoAssets; }
    public void setCryptoAssets(String cryptoAssets) { this.cryptoAssets = cryptoAssets; }

    public InvestorType getInvestorType() { return investorType; }
    public void setInvestorType(InvestorType investorType) { this.investorType = investorType; }

    public String getContentTypes() { return contentTypes; }
    public void setContentTypes(String contentTypes) { this.contentTypes = contentTypes; }
}
