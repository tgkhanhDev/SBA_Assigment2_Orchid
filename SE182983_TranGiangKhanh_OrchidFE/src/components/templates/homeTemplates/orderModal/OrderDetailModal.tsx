import React from 'react';
import './index.scss';
import { Order, OrderDetail } from '../../../../services/orderService';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>Chi tiết đơn hàng #{order.id}</h2>
        <div className="order-summary-modal">
          <p><strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Trạng thái:</strong> <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span></p>
          <p><strong>Tổng tiền:</strong> ₫{order.totalAmount.toLocaleString()}</p>
        </div>

        <h3>Các sản phẩm:</h3>
        {order === null ? (
          <p>Đang tải chi tiết sản phẩm...</p>
        ) : (
          <div className="order-items-modal">
            {order.orderDetail.map(item => (
              <div key={item.id} className="order-item-modal-card">
                <img src={item.orchidUrl || 'https://via.placeholder.com/50'} alt={item.orchidName} className="order-item-modal-img" />
                <div className="order-item-modal-info">
                  <h4>{item.orchidName || `Orchid ID: ${item.orchidID}`}</h4>
                  <p>Giá: ₫{item.price.toLocaleString()}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Tổng: ₫{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;