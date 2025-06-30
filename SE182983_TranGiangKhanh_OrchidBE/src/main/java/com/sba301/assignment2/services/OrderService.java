package com.sba301.assignment2.services;

import com.sba301.assignment2.dtos.responses.OrderResponse;
import com.sba301.assignment2.models.Order;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAllOrdersByAccountId(Long accountId);
    OrderResponse createOrder(Order order);
}