package com.sba301.assignment2.mapper;

import com.sba301.assignment2.dtos.responses.OrderDetailResponse;
import com.sba301.assignment2.dtos.responses.OrderResponse;
import com.sba301.assignment2.models.Orchid;
import com.sba301.assignment2.models.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {
    public static OrderResponse toResponse(Order order) {
        List<OrderDetailResponse> detailResponses = order.getOrderDetails().stream().map(detail -> {
            Orchid orchid = detail.getOrchid();
            return new OrderDetailResponse(
                    detail.getId(),
                    orchid.getOrchidId(),
                    orchid.getOrchidName(),
                    orchid.getOrchidUrl(),
                    detail.getPrice(),
                    detail.getQuantity(),
                    order.getId()
            );
        }).collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getAccount().getId(),
                order.getOrderDate(),
                order.getOrderStatus(),
                order.getTotalAmount(),
                detailResponses
        );
    }
}
