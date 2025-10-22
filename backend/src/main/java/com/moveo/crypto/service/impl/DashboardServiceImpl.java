package com.moveo.crypto.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moveo.crypto.domain.DashboardContent;
import com.moveo.crypto.domain.User;
import com.moveo.crypto.dto.DashboardDtos;
import com.moveo.crypto.repository.DashboardContentRepository;
import com.moveo.crypto.service.DashboardService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * DashboardServiceImpl
 * Returns a daily dashboard snapshot for a user. It caches the result in DB.
 * Replace the 'stub*' methods with real HTTP calls to free APIs.
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    private final DashboardContentRepository contentRepo;
    private final ObjectMapper om = new ObjectMapper();

    public DashboardServiceImpl(DashboardContentRepository contentRepo) {
        this.contentRepo = contentRepo;
    }

    @Override
    public DashboardDtos.DashboardResponse getDailyDashboard(User user) {
        LocalDate today = LocalDate.now();
        DashboardContent content = contentRepo.findByUserAndDate(user, today)
                .orElseGet(() -> {
                    DashboardContent dc = new DashboardContent();
                    dc.setUser(user);
                    dc.setDate(today);
                    try {
                        dc.setMarketNewsJson(om.writeValueAsString(stubNews()));
                        dc.setCoinPricesJson(om.writeValueAsString(stubPrices()));
                        dc.setAiInsightJson(om.writeValueAsString("Stay disciplined. Diversify across assets you believe in."));
                        dc.setMemeUrl("https://i.imgur.com/your-meme.png");
                    } catch (Exception e) { throw new RuntimeException(e); }
                    return contentRepo.save(dc);
                });

        try {
            DashboardDtos.DashboardResponse resp = new DashboardDtos.DashboardResponse();
            resp.marketNews = om.readValue(content.getMarketNewsJson(), new TypeReference<List<DashboardDtos.NewsItem>>(){});
            resp.coinPrices = om.readValue(content.getCoinPricesJson(), new TypeReference<List<DashboardDtos.PriceItem>>(){});
            resp.aiInsight = om.readValue(content.getAiInsightJson(), String.class);
            resp.memeUrl = content.getMemeUrl();
            return resp;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse cached dashboard JSON", e);
        }
    }

    // ---- Stub providers (replace with real API calls) ----
    private List<DashboardDtos.NewsItem> stubNews() {
        return List.of(makeNews("Bitcoin hits key level", "https://news.example/1", "ExampleNews", "2025-10-21T10:00:00Z"),
                       makeNews("ETH ecosystem upgrades", "https://news.example/2", "ExampleNews", "2025-10-21T12:00:00Z"));
    }
    private DashboardDtos.NewsItem makeNews(String t, String u, String s, String p) {
        DashboardDtos.NewsItem n = new DashboardDtos.NewsItem();
        n.title = t; n.url = u; n.source = s; n.publishedAt = p;
        return n;
    }

    private List<DashboardDtos.PriceItem> stubPrices() {
        return List.of(makePrice("BTC", 65000.0, 2.1),
                       makePrice("ETH", 3400.0, -0.5));
    }
    private DashboardDtos.PriceItem makePrice(String sym, double price, double ch) {
        DashboardDtos.PriceItem p = new DashboardDtos.PriceItem();
        p.symbol = sym; p.priceUsd = price; p.change24hPct = ch; return p;
    }
}
