package com.sba301.assignment2.services.impl;

import com.sba301.assignment2.dtos.responses.AccountResponse;
import com.sba301.assignment2.exceptions.AppException;
import com.sba301.assignment2.models.Account;
import com.sba301.assignment2.repositories.AccountRepository;
import com.sba301.assignment2.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public AccountResponse createAccount(Account account) {
        boolean isMailExist = accountRepository.existsByEmail(account.getEmail());
        if (isMailExist) throw new AppException(400, "Email đã tồn tại", HttpStatus.BAD_REQUEST);
        return AccountResponse.of(accountRepository.save(account));
    }

    @Override
    public AccountResponse updateAccount(Account account) {
        Account found = accountRepository.findById(account.getId()).orElseThrow(()-> new AppException(400, "Account not found", HttpStatus.BAD_REQUEST));
        found.setEmail(account.getEmail());
        found.setAcountName(account.getAcountName());
        found.setPassword(account.getPassword());
        return AccountResponse.of(accountRepository.save(found));
    }

    @Override
    public AccountResponse getAccount(Long accountId) {
        Account found = accountRepository.findById(accountId).orElseThrow(()-> new AppException(400, "Account not found", HttpStatus.BAD_REQUEST));
        return AccountResponse.of(found);
    }

    @Override
    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public boolean isEmailExist(String email) {
        return accountRepository.existsByEmail(email);
    }
}
