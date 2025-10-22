package com.moveo.crypto.dto;

import java.util.List;

/**
 * DTOs representing the shape of the dashboard response.
 */
public class DashboardDtos {

    public static class NewsItem {
        public String title;
        public String url;
        public String source;
        public String publishedAt;
    }

    public static class PriceItem {
        public String symbol;
        public double priceUsd;
        public double change24hPct;
    }

    public static class DashboardResponse {
        public List<NewsItem> marketNews;
        public List<PriceItem> coinPrices;
        public String aiInsight;
        public String memeUrl;
    }
}
