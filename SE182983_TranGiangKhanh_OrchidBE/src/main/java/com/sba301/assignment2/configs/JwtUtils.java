package com.sba301.assignment2.configs;

import com.sba301.assignment2.models.Account;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.signerKey}")
    private String signerKey;

    @Value("${jwt.ttl}")
    private Integer jwtTTL;

    public String generateJwtToken(
            Account account
    ) {
        String secret = signerKey;
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder().issuer("Assignment2_SBA301_SE182983")
                .subject(account.getId()+"")
                .claim("email", account.getEmail())
                .claim("accountID", account.getId())
                .claim("role", account.getRole().getRoleName().toUpperCase())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtTTL))
                .signWith(secretKey).compact();
    }

    public String extractAccountIdFromToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(signerKey.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("accountID", String.class);
    }
}
