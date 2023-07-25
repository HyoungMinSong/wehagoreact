import React from 'react';
import { Navigate  } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';

const LoginRoute = ({ isLogin, url}) => {
  return(
      isLogin ? <Navigate to={url} /> : <LoginPage/>
  )
}

export default LoginRoute;
