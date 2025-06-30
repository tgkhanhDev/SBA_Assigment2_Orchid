package com.sba301.assignment2.dtos.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectResponse {
    String token;
    boolean isValid;
    String sub;
    String iss;
    Date exp;
    String scope;
    String iat;

}
