import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  auth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth }) => {

  return (
    <>
      { auth ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  )
}

export default ProtectedRoute;
