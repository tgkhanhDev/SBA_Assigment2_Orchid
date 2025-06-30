package com.sba301.assignment2.dtos.requests;


import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAccountRequest {
    @NotNull(message = "Account name is required")
    private String accountName;
    @NotNull(message = "Account email is required")
    private String email;
    @NotNull(message = "Account password is required")
    private String password;
    @NotNull(message = "Role is required")
    private Long roleId;
}
