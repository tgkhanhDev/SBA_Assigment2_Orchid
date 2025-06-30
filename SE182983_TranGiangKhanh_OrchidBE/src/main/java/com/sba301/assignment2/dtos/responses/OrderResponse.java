package com.sba301.assignment2.dtos.responses;

import com.sba301.assignment2.models.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private Long accountID;
    private LocalDate orderDate;
    private String orderStatus;
    private Double totalAmount;
    private List<OrderDetailResponse> orderDetail;

}