package com.sba301.assignment2.services.impl;

import com.sba301.assignment2.dtos.responses.OrderResponse;
import com.sba301.assignment2.exceptions.AppException;
import com.sba301.assignment2.mapper.OrderMapper;
import com.sba301.assignment2.models.Account;
import com.sba301.assignment2.models.Orchid;
import com.sba301.assignment2.models.Order;
import com.sba301.assignment2.models.OrderDetail;
import com.sba301.assignment2.repositories.AccountRepository;
import com.sba301.assignment2.repositories.OrchidRepository;
import com.sba301.assignment2.repositories.OrderDetailRepository;
import com.sba301.assignment2.repositories.OrderRepository;
import com.sba301.assignment2.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final AccountRepository accountRepository;
    private final OrchidRepository orchidRepository;

    @Override
    public List<OrderResponse> getAllOrdersByAccountId(Long accountId) {
        return orderRepository.findByAccountId(accountId).stream()
                .map(OrderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse createOrder(Order order) {
        // Kiểm tra account
        Account account = accountRepository.findById(order.getAccount().getId())
                .orElseThrow(() -> new AppException(400, "Tài khoản không tồn tại", HttpStatus.BAD_REQUEST));
        if(account.getRole().getId() == 1){
            throw new AppException(403, "Admin không có quyền truy cập", HttpStatus.FORBIDDEN);
        }

        order.setAccount(account);
        order.setOrderDate(LocalDate.now());

        // Tách orderDetails tạm thời
        List<OrderDetail> orderDetails = new ArrayList<>(order.getOrderDetails());
        order.setOrderDetails(new ArrayList<>()); // tránh loop setOrder trước

        // Lưu order trước
        Order savedOrder = orderRepository.save(order);

        // Xử lý từng orderDetail
        for (OrderDetail detail : orderDetails) {
            Orchid orchid = orchidRepository.findById(detail.getOrchid().getOrchidId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy loài hoa này"));

            detail.setOrder(savedOrder);  // set lại order đã có ID
            detail.setOrchid(orchid);
        }

        // Lưu orderDetails sau
        orderDetailRepository.saveAll(orderDetails);

        // Gán lại để trả ra response đầy đủ
        savedOrder.setOrderDetails(orderDetails);

        return OrderMapper.toResponse(savedOrder);
    }

}
