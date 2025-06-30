import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/orchidDetailContent.scss';

interface CartItem {
    orchidID: number;
    orchidName: string;
    price: number;
    quantity: number;
    orchidUrl: string;
}

interface Orchid {
    orchidID: number;
    orchidName: string;
    isNatural: boolean;
    orchidDescription: string;
    price: number;
    orchidUrl: string;
    category: {
        categoryID: number;
        categoryName: string;
    };
}

export const OrchidDetailContent = ({ orchid }: { orchid: Orchid }) => {
    useEffect(()=>{
        console.log("test: ", orchid);

    }, [orchid]);

    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        } else if (event.target.value === '') {
            setQuantity(0);
        }
    };

    const handleAddToCart = () => {
        if (!orchid || quantity <= 0) {
            alert('Vui lòng chọn số lượng sản phẩm hợp lệ.');
            return;
        }

        const existingCartString = localStorage.getItem('cart');
        let cart: CartItem[] = [];

        if (existingCartString) {
            try {
                cart = JSON.parse(existingCartString);
            } catch (e) {
                console.error("Failed to parse cart from Local Storage", e);
                cart = [];
            }
        }

        const existingItemIndex = cart.findIndex(item => item.orchidID === orchid?.orchidID);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            const newItem: CartItem = {
                orchidID: orchid?.orchidID,
                orchidName: orchid?.orchidName,
                price: orchid?.price,
                quantity: quantity,
                orchidUrl: orchid?.orchidUrl
            };
            cart.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Đã thêm ${quantity} sản phẩm "${orchid?.orchidName}" vào giỏ hàng thành công!`);

    };

    return (
        <div className="orchid-detail-card">
            <h1 className="detail-title">{orchid?.orchidName}</h1>
            <div className="detail-content-layout">
                <div className="detail-image-wrapper">
                    <img src={orchid?.orchidUrl} alt={orchid?.orchidName} className="detail-image" />
                </div>
                <div className="detail-info-buy">
                    <p><strong>Mô tả:</strong> {orchid?.orchidDescription}</p>
                    <p><strong>Giá:</strong> ₫{orchid?.price.toLocaleString()}</p>
                    <p><strong>Danh mục:</strong> {orchid?.category.categoryName}</p>
                    <p><strong>Nguồn gốc:</strong> <span className={`rounded-pill px-2 ${orchid?.isNatural ? 'bg-success text-white' : 'bg-warning text-black'}`}>{orchid?.isNatural ? 'Tự nhiên' : 'Công nghiệp'}</span></p>

                    <div className="quantity-control">
                        <label htmlFor="quantity">Số lượng:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrchidDetailContent;