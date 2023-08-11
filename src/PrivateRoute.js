import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ accessToken, component : Component}) => {
  return(
    accessToken ? Component : <Navigate to={"/error/401"} />
  )
}

export default PrivateRoute;
