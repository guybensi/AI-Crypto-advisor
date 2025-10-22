package com.moveo.crypto.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

/**
 * Small JWT helper. In production, rotate secrets and add claims as needed.
 */
public class JwtUtil {
    public static String generateToken(String subject, String secret, long expirationMillis) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMillis);
        Key key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
