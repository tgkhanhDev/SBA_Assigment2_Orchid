package com.sba301.assignment2.services.impl;


import com.sba301.assignment2.configs.JwtUtils;
import com.sba301.assignment2.dtos.requests.AuthenticationRequest;
import com.sba301.assignment2.dtos.requests.CreateAccountRequest;
import com.sba301.assignment2.dtos.responses.AccountResponse;
import com.sba301.assignment2.dtos.responses.AuthenticationResponse;
import com.sba301.assignment2.dtos.responses.IntrospectResponse;
import com.sba301.assignment2.exceptions.AppException;
import com.sba301.assignment2.models.Account;
import com.sba301.assignment2.models.Role;
import com.sba301.assignment2.repositories.RoleRepository;
import com.sba301.assignment2.services.AccountService;
import com.sba301.assignment2.services.AuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Value("${jwt.signerKey}")
    private String signerKey;

    private final AccountService customerService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthenticationServiceImpl(AccountService customerService, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.customerService = customerService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }


    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        Account found = customerService.getAccountByEmail(authenticationRequest.getEmail());
        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), found.getPassword());
        if (!authenticated) {
            throw new AppException(400, "Tài khoản hoặc mật khẩu chưa chính xác", HttpStatus.BAD_REQUEST);
        }
        String token = jwtUtils.generateJwtToken(found);
        return AuthenticationResponse.builder()
                .token(token)
                .accountId(found.getId())
                .accountName(found.getAcountName())
                .accountRole(found.getRole().getRoleName())
                .code(200)
                .authenticated(true)
                .build();
    }


    @Override
    public AccountResponse createAccount(CreateAccountRequest accountCreateRequest) {
        Role found = roleRepository.findById(accountCreateRequest.getRoleId()).orElseThrow(() -> new AppException(400, "Role not found", HttpStatus.BAD_REQUEST));
        String hashedPassword = passwordEncoder.encode(accountCreateRequest.getPassword());
        Account saveCus = Account.builder()
                .email(accountCreateRequest.getEmail())
                .password(hashedPassword)
                .acountName(accountCreateRequest.getAccountName())
                .role(found)
                .build();
        return customerService.createAccount(saveCus);
    }


    @Override
    public IntrospectResponse introspect(String token) {
        try {
            byte[] keyBytes = signerKey.getBytes(StandardCharsets.UTF_8);
            SecretKey secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
            Jws<Claims> jws = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);

            Claims claims = jws.getPayload();

            // Check ttl
            Date expiration = claims.getExpiration();
            boolean isActive = expiration != null && expiration.after(Date.from(Instant.now()));

            return IntrospectResponse.builder()
                    .token(token)
                    .isValid(isActive)
                    .scope(claims.get("scope").toString())
                    .sub(claims.getSubject())
                    .exp(expiration)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return IntrospectResponse.builder()
                    .token(null)
                    .isValid(false)
                    .scope(null)
                    .sub(null)
                    .exp(null)
                    .build();
        }

    }

}