package com.sba301.assignment2.controllers;


import com.sba301.assignment2.dtos.requests.AuthenticationRequest;
import com.sba301.assignment2.dtos.requests.CreateAccountRequest;
import com.sba301.assignment2.dtos.requests.IntrospectRequest;
import com.sba301.assignment2.dtos.responses.AccountResponse;
import com.sba301.assignment2.dtos.responses.ApiResponse;
import com.sba301.assignment2.dtos.responses.AuthenticationResponse;
import com.sba301.assignment2.dtos.responses.IntrospectResponse;
import com.sba301.assignment2.services.AccountService;
import com.sba301.assignment2.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private AuthenticationService authenticationService;
    private AccountService accountService;

    @GetMapping("/email-exist/{email}")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.success(accountService.isEmailExist(email))
        );
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> login(@RequestBody @Valid AuthenticationRequest authenticationRequest) {
        AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);
        ApiResponse<AuthenticationResponse> rs = ApiResponse.<AuthenticationResponse>builder()
                .code(response.getCode())
                .message("Login successful")
                .data(response)
                .build();
        return ResponseEntity.ok(rs);
    }

    @PostMapping("/account/create")
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(@RequestBody @Valid CreateAccountRequest customerCreateRequest) {
        AccountResponse res = authenticationService.createAccount(customerCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<AccountResponse>builder()
                        .data(res)
                        .code(201)
                        .message("Account created")
                        .build()
        );
    }

    @PostMapping("/introspect")
    public ResponseEntity<ApiResponse<IntrospectResponse>> introspect(@RequestBody @Valid IntrospectRequest request) {
        IntrospectResponse response = authenticationService.introspect(request.getToken());
        return ResponseEntity.status(HttpStatus.OK).body(
                ApiResponse.<IntrospectResponse>builder()
                        .code(200)
                        .data(response)
                        .message("Success")
                        .build()
        );
    }

    @PostMapping("/test")
    public String test(@RequestBody @Valid IntrospectRequest request) {
        return "test";
    }

    @GetMapping("/account")
    public List<AccountResponse> getAllAccounts(@RequestParam(value = "search", required = false) String email) {
        List<AccountResponse> accountResponses = accountService.getAllAccountsSearchByEmail(email);
        return accountResponses;

    }
}
