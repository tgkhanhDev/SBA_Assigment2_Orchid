package com.sba301.assignment2.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private Long id;
    private Long orchidID;
    private String orchidName;
    private String orchidUrl;
    private Double price;
    private Integer quantity;
    private Long orderID;
}