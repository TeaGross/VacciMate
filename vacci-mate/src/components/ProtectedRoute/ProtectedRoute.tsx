import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { activeUser } = useContext(AuthContext);

    if (!activeUser) {
        return <Navigate to="/" replace />;
    }

    return children;
};
