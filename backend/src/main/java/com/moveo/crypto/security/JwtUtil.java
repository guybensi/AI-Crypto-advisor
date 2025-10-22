package com.moveo.crypto.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    /**
     * @param base64Secret מפתח סודי בפורמט Base64 (32 בייט לפחות לפני הקידוד)
     */
    public static String generateToken(String subject, String base64Secret, long expirationMillis) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMillis);

        byte[] keyBytes = Decoders.BASE64.decode(base64Secret); // ← לפענח Base64
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
