package com.sba301.assignment2.services;


import com.sba301.assignment2.dtos.requests.AuthenticationRequest;
import com.sba301.assignment2.dtos.requests.CreateAccountRequest;
import com.sba301.assignment2.dtos.responses.AccountResponse;
import com.sba301.assignment2.dtos.responses.AuthenticationResponse;
import com.sba301.assignment2.dtos.responses.IntrospectResponse;
import com.sba301.assignment2.models.Account;

public interface AuthenticationService {
    public IntrospectResponse introspect(String token);
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
    public AccountResponse createAccount(CreateAccountRequest customerCreateRequest);
}