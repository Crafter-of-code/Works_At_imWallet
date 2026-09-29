package com.app.backend.utility;

import com.app.backend.dto.auth.LoginRequestDto;
import com.auth0.jwt.JWT;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
@Service
public class JwtUtil {

    private final SecretKey secretKey;

    JwtUtil(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String userEmail) {

        return Jwts.builder()
                .subject(userEmail)
                .issuedAt(new Date())
//                .expiration(
//                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
//                )
                .signWith(secretKey)
                .compact();
    }

    public String extractUserEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
//    public String generateAccessToken(LoginRequestDto user) {
//        Instant now = Instant.now();
//        return JWT.create()
//                .withSubject(user.getId().toString())
//                .withClaim("email", user.getUserEmail())
//                .withClaim("role", user.getRole())
//                .withIssuedAt(now)
//                .withExpiresAt(now.plus(10, ChronoUnit.MINUTES))
//                .sign(rsaAlgorithm);
//    }
}