package com.sba301.assignment2.dtos.responses;

import java.util.Date;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    int code;
    boolean authenticated;
    Long accountId;
    String accountName;
    String accountRole;
}
