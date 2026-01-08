import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

type GuestOnlyProps = {
    children: React.ReactNode;
};

export const GuestOnlyRoute = ({ children }: GuestOnlyProps) => {
    const { activeUser } = useContext(AuthContext);

    if (activeUser) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
