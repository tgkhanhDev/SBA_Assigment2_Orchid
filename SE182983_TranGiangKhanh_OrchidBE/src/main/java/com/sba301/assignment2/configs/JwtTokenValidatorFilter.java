package com.sba301.assignment2.configs;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sba301.assignment2.dtos.responses.ApiResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class JwtTokenValidatorFilter extends OncePerRequestFilter {

    @Value("${jwt.signerKey}")
    private String signerKey;

//    @Autowired
//    private SystemAccountService systemAccountService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader("Authorization");

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);

            try {
                String secret = signerKey;
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                Claims claims = Jwts.parser().verifyWith(secretKey)
                        .build().parseSignedClaims(jwt).getPayload();
                String id = String.valueOf(claims.get("accountID"));
                String role = String.valueOf(claims.get("role"));

//                String authorities = String.valueOf(claims.get("authorities"));
                List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_" + role.toUpperCase());
                Authentication authentication = new UsernamePasswordAuthenticationToken(id, null,
                        authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (JwtException ex) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                ApiResponse<?> apiResponse = ApiResponse.builder()
                        .code(HttpStatus.UNAUTHORIZED.value())
                        .message(ex.getMessage())
                        .build();
                ObjectMapper objectMapper = new ObjectMapper();
                response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
                response.flushBuffer();
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

}