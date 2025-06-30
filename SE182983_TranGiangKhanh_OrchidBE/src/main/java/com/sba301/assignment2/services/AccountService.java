package com.sba301.assignment2.services;

import com.sba301.assignment2.dtos.responses.AccountResponse;
import com.sba301.assignment2.models.Account;

public interface AccountService {
    public AccountResponse createAccount(Account account);
    public AccountResponse updateAccount(Account account);
    public AccountResponse getAccount(Long accountId);
    public Account getAccountByEmail(String email);
    public boolean isEmailExist(String email);
}
