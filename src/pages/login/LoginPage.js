import React, { useState } from 'react';
import './LoginPage.css';
import axiosApi from "../../AxiosApi";

const LoginForm = ({ handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="사용자 이름" name="username" />
      <input type="password" placeholder="비밀번호" name="password" />
      <button type="submit">로그인</button>
    </form>
  );
};

const LoginPage = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
  
    try {
      const response = await axiosApi.post('/login', {
        userid: username,
        password: password,
      });
  
      if (response.status === 200) {
        console.log('로그인 성공!');
        setLoggedIn(true);
        setLoginError(null);
      } else if (response.status === 401) {
        console.error('비밀번호가 잘못되었습니다!');
        setLoggedIn(false);
        setLoginError('비밀번호가 잘못되었습니다.');
      } else {
        console.error('로그인 실패!');
        setLoggedIn(false);
        setLoginError('로그인에 실패했습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('비밀번호가 잘못되었습니다!');
        setLoggedIn(false);
        setLoginError('비밀번호가 잘못되었습니다.');
      } else if (!error.response) {
        console.error('로그인 요청 중 오류 발생:', error);
        setLoggedIn(false);
        setLoginError('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={`wrapper${formSuccess ? ' form-success' : ''}`}>
      <div className="container">
        <h1 className={`${formSuccess ? 'form-success' : ''}`}>Welcome</h1>

        {!loggedIn ? (
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="아이디" name="username" />
            <input type="password" placeholder="비밀번호" name="password" />
            <button type="submit" id="login-button">
              로그인
            </button>
          </form>
        ) : (
          <div>로그인 성공!</div>
        )}

        {loginError && <div className="error">{loginError}</div>}
      </div>

      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default LoginPage;
