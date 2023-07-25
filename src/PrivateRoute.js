import React from 'react';
import { Navigate  } from 'react-router-dom';

const PrivateRoute = ({ isLogin, component : Component}) => {
  return(
      isLogin ? Component : <Navigate to="/login" {...alert("로그인이 필요합니다.")} />
  )
}

export default PrivateRoute;
