import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from './jwtUtils';
import { useSelector } from 'react-redux';

const RoleRoute = ({ accessToken, component : Component}) => {
    const { companyName } = useSelector((state) => state.loginUserData);
    
    if (!accessToken) {
        // 로그인이 필요한 경우
        return <Navigate to="/error/401" />;
    } else {
        const role = getUserRole(accessToken)[companyName];
        console.log(role);
        if (role === '0' || role === '1') {
            return Component;
        } else {
            // 권한이 필요한 경우
            return <Navigate to="/error/403" />;
        }
    }
}

export default RoleRoute;