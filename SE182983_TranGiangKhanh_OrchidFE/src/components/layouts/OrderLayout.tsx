import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/orderOverall.scss';
import OrderDetailModal from '../templates/homeTemplates/orderModal/OrderDetailModal';
import orderService, { Order, OrderDetail } from '../../services/orderService';

export const OrderLayout: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Để mở modal chi tiết
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const id = localStorage.getItem('id');
                const response: any = await orderService.getAllOrderByAccountID(parseInt(id as string)); 
                console.log("orders: ", response);
                
                setOrders(response.data || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (order: Order) => {
        console.log("ordersadasdas:", order);
        
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    if (loading) {
        return (
            <div className="homepage-container">
                <p>Đang tải danh sách đơn hàng...</p>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage-container">
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/')} className="back-button">Quay lại Trang chủ</button>
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <div className="orders-page-container">
                <h1 className="orders-title">Đơn hàng của tôi</h1>

                {orders.length === 0 ? (
                    <p className="empty-orders-message">Bạn chưa có đơn hàng nào.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <span className="order-id">Mã đơn hàng: #{order.id}</span>
                                    <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                <div className="order-body">
                                    <p><strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <p><strong>Tổng tiền:</strong> ₫{order.totalAmount.toLocaleString()}</p>
                                </div>
                                <div className="order-footer">
                                    <button
                                        className="view-details-button"
                                        onClick={() => handleViewDetails(order)}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default OrderLayout;