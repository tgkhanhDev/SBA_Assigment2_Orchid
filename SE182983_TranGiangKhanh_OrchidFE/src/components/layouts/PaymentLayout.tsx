import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './scss/paymentOverall.scss';
import {orderService} from '../../services/orderService' 

interface OrchidItemForPayment {
    orchidID: number;
    orchidName: string;
    price: number;
    quantity: number;
    orchidUrl: string;
}

const PaymentLayout: React.FC = () => {
    const navigate = useNavigate();
    const [orchidItems, setOrchidItems] = useState<OrchidItemForPayment[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        const existingCartString = localStorage.getItem('cart');
        let cart: OrchidItemForPayment[] = [];

        if (existingCartString) {
            try {
                cart = JSON.parse(existingCartString);
            } catch (e) {
                console.error("Failed to parse cart from Local Storage on payment page", e);
                cart = [];
            }
        }

        if (cart.length > 0) {
            setOrchidItems(cart);
        } else {
            alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
            navigate('/cart');
        }
    }, [navigate]);

    const calculateTotalPrice = () => {
        return orchidItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (orchidItems.length === 0) {
            alert('Không có sản phẩm trong giỏ hàng để thanh toán.');
            return;
        }

        console.log("product: ", orchidItems);
        // {
        //     "account": {
        //       "id": 2
        //     },
        //     "orderDate": "2025-06-10",
        //     "orderStatus": "Processing",
        //     "totalAmount": 800000,
        //     "orderDetails": [
        //       {
        //         "orchid": {
        //           "orchidId": 1
        //         },
        //         "price": 400000,
        //         "quantity": 2
        //       }
        //     ]
        //   }
        const order: any = {
            account: {
                id: localStorage.getItem('id')
            },
            orderDate: new Date().toISOString().slice(0, 10),
            orderStatus: "Paid",
            totalAmount: calculateTotalPrice(),
            orderDetails: orchidItems.map(item => ({
                orchid: {
                    orchidId: item.orchidID
                },
                price: item.price,
                quantity: item.quantity
            }))
        };

        const orderRes = await orderService.createOrder(order);

        console.log("finalOrder:", orderRes);
    


        alert(`Đơn hàng của bạn đã được đặt thành công!\nTổng tiền: ₫${calculateTotalPrice().toLocaleString()}\nChúng tôi sẽ liên hệ với bạn sớm nhất.`);

        localStorage.removeItem('cart');

    };

    if (orchidItems.length === 0) {
        return (
            <div className="homepage-container">
                <p>Đang tải thông tin thanh toán...</p>
                <div className="loading-spinner"></div> {/* Thêm spinner nếu cần */}
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <button onClick={() => navigate(-1)} className="back-button">← Quay lại</button>

            <div className="payment-page-container">
                <h1 className="payment-title">Thanh toán đơn hàng</h1>
                <div className="payment-layout">
                    <div className="order-summary">
                        <h2>Sản phẩm của bạn</h2>
                        {orchidItems.map((item) => (
                            <div key={item.orchidID} className="order-item">
                                <img src={item.orchidUrl} alt={item.orchidName} className="order-item-img" />
                                <div className="order-item-info">
                                    <h3>{item.orchidName}</h3>
                                    <p>Giá: ₫{item.price.toLocaleString()}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Tổng cộng: ₫{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <strong>Tổng tiền: ₫{calculateTotalPrice().toLocaleString()}</strong>
                        </div>
                        <button type="submit" className="confirm-payment-button" onClick={handleSubmit}>Xác nhận thanh toán</button>
                    </div>

                    {/* <div className="payment-form">
                        <h2>Thông tin thanh toán</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ giao hàng:</label>
                                <textarea
                                    id="address"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                    rows={3}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Phương thức thanh toán:</label>
                                <div className="payment-methods">
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        /> Thanh toán khi nhận hàng (COD)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit_card"
                                            checked={paymentMethod === 'credit_card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        /> Thẻ tín dụng/Ghi nợ
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === 'credit_card' && (
                                <div className="credit-card-details">
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Số thẻ:</label>
                                        <input type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardExpiry">Ngày hết hạn (MM/YY):</label>
                                        <input type="text" id="cardExpiry" placeholder="MM/YY" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardCVC">CVC:</label>
                                        <input type="text" id="cardCVC" placeholder="XXX" required />
                                    </div>
                                </div>
                            )}

                        </form>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default PaymentLayout;