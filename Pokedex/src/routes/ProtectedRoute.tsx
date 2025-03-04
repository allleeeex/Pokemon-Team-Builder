// ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { auth } = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
