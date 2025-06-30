import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './scss/orchidDetailOverall.scss';
import orchidService, { Orchid } from '../../services/orchidService';
import OrchidDetailContent from '../templates/homeTemplates/OrchidDetailContent';
import { log } from 'console';


const OrchidDetailLayout = () => {
    const { orchidID } = useParams<{ orchidID: string }>();
    const navigate = useNavigate();
    const [orchid, setOrchid] = useState<Orchid | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrchidDetail = async () => {
            try {
                if (orchidID === undefined || orchidID === null) {
                    setError('Invalid orchid ID.');
                    setLoading(false);
                    return;
                }

                const response: any = await orchidService.getOrchidById(parseInt(orchidID));
                
                const foundOrchid = response;
                if (foundOrchid) {
                    setOrchid(foundOrchid);
                } else {
                    setError('Orchid not found.');
                }
            } catch (err) {
                setError('Failed to fetch orchid details. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrchidDetail();
    }, [orchidID]);


    if (loading) {
        return (
            <div className="homepage-container">
                <div className="loading-spinner"></div>
                <p>Đang tải chi tiết hoa lan...</p>
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

    if (!orchid) {
        return (
            <div className="homepage-container">
                <p className="error-message">Không tìm thấy dữ liệu hoa lan.</p>
                <button onClick={() => navigate('/')} className="back-button">Quay lại Trang chủ</button>
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <button onClick={() => navigate('/')} className="back-button">← Quay lại tất cả Hoa lan</button>
            <OrchidDetailContent orchid={orchid} />
            
        </div>
    );
};

export default OrchidDetailLayout;