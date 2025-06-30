package com.sba301.assignment2.dtos.responses;

import com.sba301.assignment2.models.Account;
import com.sba301.assignment2.models.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountResponse {
    Long id;
    String accountName;
    String email;
    Role role;

    public static AccountResponse of(Account account) {
        return AccountResponse.builder()
                .accountName(account.getAcountName())
                .email(account.getEmail())
                .role(account.getRole())
                .build();
    }

}
