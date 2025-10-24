package com.moveo.crypto.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // בזמן פיתוח
public class ExternalApiController {

    private final RestTemplate http = new RestTemplate();

    @Value("${cryptopanic.key:}")
    private String cryptopanicKey;

    @Value("${openrouter.key:}")
    private String openrouterKey;

    // ---------- NEWS via CryptoPanic ----------
    @GetMapping("/news")
    public List<Map<String, Object>> news() {
        // אם אין מפתח – נחזיר רשומה אינפורמטיבית עם Map<String,Object>
        if (cryptopanicKey == null || cryptopanicKey.isBlank()) {
            Map<String,Object> m = new LinkedHashMap<>();
            m.put("title", "CryptoPanic key missing. Add cryptopanic.key to application.properties");
            m.put("source", "Instructions");
            m.put("url", "https://cryptopanic.com/developers/api/");
            return List.of(m);
        }

        String url = "https://cryptopanic.com/api/v1/posts/?auth_token=" + cryptopanicKey + "&public=true";
        @SuppressWarnings("unchecked")
        Map<String, Object> res = http.getForObject(url, Map.class);
        if (res == null) return List.of();

        Object raw = res.get("results");
        if (!(raw instanceof List<?>)) return List.of();

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> results =
                ((List<?>) raw).stream()
                        .filter(it -> it instanceof Map)
                        .map(it -> (Map<String, Object>) it)
                        .collect(Collectors.toList());

        return results.stream().limit(8).map(item -> {
            String title  = String.valueOf(item.getOrDefault("title",  ""));
            String domain = String.valueOf(item.getOrDefault("domain", ""));
            String link   = String.valueOf(item.getOrDefault("url",    ""));
            Map<String,Object> m = new LinkedHashMap<>();
            m.put("title",  title);
            m.put("source", domain);
            m.put("url",    link);
            return m;
        }).collect(Collectors.toList());
    }

    // ---------- AI Insight via OpenRouter ----------
    @GetMapping("/ai-insight")
    public Map<String, String> aiInsight() {
        if (openrouterKey == null || openrouterKey.isBlank()) {
            return Map.of("text",
                    "Tip: add openrouter.key in backend application.properties to enable live AI insights.");
        }

        String url = "https://openrouter.ai/api/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openrouterKey);

        Map<String, Object> body = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "You are an AI crypto advisor. Give a short, motivational (non-financial) insight."),
                        Map.of("role", "user", "content", "Give today's AI crypto insight.")
                ),
                "max_tokens", 80
        );

        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, headers);
        ResponseEntity<Map> resp = http.postForEntity(url, req, Map.class);

        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> choices = (List<Map<String, Object>>) resp.getBody().get("choices");
            Map<String, Object> first = choices.get(0);
            @SuppressWarnings("unchecked")
            Map<String, Object> msg = (Map<String, Object>) first.get("message");
            String text = String.valueOf(msg.get("content"));
            return Map.of("text", text);
        } catch (Exception e) {
            return Map.of("text", "AI service error.");
        }
    }
}
