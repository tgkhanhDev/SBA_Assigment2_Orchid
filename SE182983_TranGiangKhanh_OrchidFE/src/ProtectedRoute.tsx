// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    adminOnly?: boolean; // Rút gọn cho allowedRoles = ['Admin']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly }) => {
    const userRole = localStorage.getItem('role'); 

    // Not login yet
    // if (!userRole) {
    //     return <Navigate to="/login" replace />;
    // }

    if (adminOnly && userRole !== '1') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;