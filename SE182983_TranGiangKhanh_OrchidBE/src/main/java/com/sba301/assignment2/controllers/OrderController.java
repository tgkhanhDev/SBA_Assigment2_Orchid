package com.sba301.assignment2.controllers;

import com.sba301.assignment2.dtos.responses.OrderResponse;
import com.sba301.assignment2.models.Order;
import com.sba301.assignment2.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{id}")
    public List<OrderResponse> getAll(@PathVariable Long id) {
        return orderService.getAllOrdersByAccountId(id);
    }

    @PostMapping
    public OrderResponse create(@RequestBody Order order) {
        return orderService.createOrder(order);
    }
}