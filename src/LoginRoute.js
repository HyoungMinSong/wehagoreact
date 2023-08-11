import React from 'react';
import { Navigate  } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';

const LoginRoute = ({ accessToken, url }) => {
  return(
    accessToken ? <Navigate to={url} /> : <LoginPage/>
  )
}

export default LoginRoute;
