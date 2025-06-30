// src/pages/CartLayout.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/cartOverall.scss'; // New SCSS for CartLayout

interface CartItem {
    orchidID: number;
    orchidName: string;
    price: number;
    quantity: number;
    orchidUrl: string;
}

export const CartLayout: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    const loadCartFromLocalStorage = () => {
        const existingCartString = localStorage.getItem('cart');
        if (existingCartString) {
            try {
                setCartItems(JSON.parse(existingCartString));
            } catch (e) {
                console.error("Failed to parse cart from Local Storage", e);
                setCartItems([]);
            }
        }
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.orchidID === id ? { ...item, quantity: newQuantity } : item
        ).filter(item => item.quantity > 0); // Loại bỏ sản phẩm nếu số lượng về 0
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id: number) => {
        const updatedCart = cartItems.filter(item => item.orchidID !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleProceedToPayment = () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
            return;
        }
        navigate('/payment');
    };

    return (
        <div className="homepage-container">
            <div className="cart-page-container">
                <h1 className="cart-title">Giỏ hàng của bạn</h1>

                {cartItems.length === 0 ? (
                    <p className="empty-cart-message">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.orchidID} className="cart-item-card">
                                <img src={item.orchidUrl} alt={item.orchidName} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h3>{item.orchidName}</h3>
                                    <p>Giá: ₫{item.price.toLocaleString()}</p>
                                    <div className="quantity-control-cart">
                                        <button onClick={() => updateQuantity(item.orchidID, item.quantity - 1)}>-</button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.orchidID, parseInt(e.target.value))}
                                            min="0"
                                        />
                                        <button onClick={() => updateQuantity(item.orchidID, item.quantity + 1)}>+</button>
                                    </div>
                                    <p>Tổng cộng: ₫{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                                <button className="remove-item-button" onClick={() => removeItem(item.orchidID)}>Xóa</button>
                            </div>
                        ))}
                        <div className="cart-summary">
                            <div className="total-amount">
                                <strong>Tổng tiền: ₫{calculateTotalAmount().toLocaleString()}</strong>
                            </div>
                            <button className="proceed-to-payment-button" onClick={handleProceedToPayment}>
                                Tiến hành thanh toán
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartLayout;