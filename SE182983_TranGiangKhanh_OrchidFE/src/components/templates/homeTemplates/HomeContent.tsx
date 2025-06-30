import React, { useEffect } from 'react'
import CardItem from '../../ui/CardItem'
import { useNavigate } from 'react-router-dom';
import './scss/homeContent.scss'
import { log } from 'console';

const HomeContent = ({orchids}) => {
    const navigate = useNavigate();

    const handleCardClick = (orchidID: number) => {
        navigate(`/orchid/${orchidID}`);
    };

    return (
        <div className="orchid-card-grid" >
            {
                orchids.map((orchid) => (
                    <div key={orchid.orchidID} onClick={() => handleCardClick(orchid.orchidID)}>
                        <CardItem orchidItem={orchid} />
                    </div>
                ))
            }
        </div>
    )
}

export default HomeContent