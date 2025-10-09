import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({roles, children}: any) => {
    
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" />;
   
    if(roles && !roles.includes(role)){
        return <Navigate to="/unauthorized"/>
    }
  return children;
}

export default ProtectedRoute