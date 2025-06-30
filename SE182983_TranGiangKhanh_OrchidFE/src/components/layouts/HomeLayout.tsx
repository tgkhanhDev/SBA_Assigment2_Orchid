import React, { useState, useEffect } from 'react';
import './scss/homeLayoutOverall.scss';
import orchidService, { Orchid } from '../../services/orchidService';
import HomeTitle from '../templates/homeTemplates/HomeTitle';
import HomeContent from '../templates/homeTemplates/HomeContent';

export const HomePage: React.FC = () => {
    const [orchids, setOrchids] = useState<Orchid[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrchids = async () => {
            try {
                const response: any = await orchidService.getOrchidFilter({orchidName:''});
                console.log("orchids laf gif: ", response);
                setOrchids(response || []);
            } catch (err) {
                setError('Failed to fetch orchids. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrchids();
    }, []);

    if (loading) {
        return (
            <div className="homepage-container">
                <div className="loading-spinner"></div>
                <p>Loading orchids...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage-container">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <HomeTitle/>
            <HomeContent orchids={orchids} />
        </div>
    );
};

export default HomePage;