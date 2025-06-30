import React, { useState } from 'react'
import "./ui.scss"

interface CardProps {
    orchidItem: {
        orchidID: number;
        orchidName: string;
        isNatural: boolean;
        orchidDescription: string;
        price: number;
        orchidUrl: string;
        Category: {
            categoryID: number;
            categoryName: string;
        };
    }
}

export const CardItem: React.FC<CardProps> = ({ orchidItem }) => {
    const [zoom, setZoom] = useState(false);

    const getRoleString = (roleId) => {
        if (roleId == 1) {
            return "Admin"
        } else {
            return "Guest"
        }
    }

    return (
        <div id="card-ui" className="my-4">
            <div
                className="zoom-card mx-auto"
                onClick={() => setZoom(!zoom)}
                role="button"
                aria-label={`Toggle card for ${orchidItem.orchidName}`}
            >
                <div className={`zoom-card-inner ${zoom ? 'rotate-card' : ''}`}>
                    <div className="zoom-card-front">
                        <div className="card-title-line"></div>
                        <h4 className='card-title'>
                            {orchidItem?.orchidName}
                        </h4>
                        <div className="card-price">₫{orchidItem?.price.toLocaleString()}</div>
                        <div className="row g-3">
                            <div className="col-4 card-thumbnail">
                                <img
                                    src={orchidItem?.orchidUrl || 'src/assets/unknownUser.png'}
                                    alt={orchidItem?.orchidName}
                                    className="item-img"
                                    onError={(e) => (e.currentTarget.src = 'src/assets/unknownUser.png')}
                                />
                                <div className={`article-date`}>
                                    <div>
                                        <span className="text-decoration-underline">Loại hoa:</span>
                                        {orchidItem?.Category?.categoryName}
                                    </div>
                                    <div>
                                        <span className="text-decoration-underline">Xuất xứ:</span>
                                        <span className={`rounded-pill px-2 ${orchidItem.isNatural ? 'bg-success' : 'bg-warning text-black'}`}>
                                            {orchidItem.isNatural ? 'Tự nhiên' : 'Công nghiệp'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 card-content">{orchidItem?.orchidDescription}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardItem