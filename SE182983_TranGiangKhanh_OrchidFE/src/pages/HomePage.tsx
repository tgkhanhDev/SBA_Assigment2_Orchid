import HeaderLayoutHome from "../components/layouts/HeaderLayoutHome";
import HomeLayout from "../components/layouts/HomeLayout";
import React from 'react';

export const HomePage: React.FC = () => {
    return (
        <>
            <HeaderLayoutHome />
            <HomeLayout />
        </>
    )
};

export default HomePage;