import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../components/AuthProvider';

const PrivateRoute = () => {
    const { isAuthenticated, signin } = useAuthContext();
    
    if (isAuthenticated()) {
        return <Outlet />
    } else {
        signin();
        return null;
    }
};

export default PrivateRoute;