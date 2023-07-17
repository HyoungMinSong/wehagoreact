import React, { useState } from 'react';
import './LoginPage.css'; // CSS 파일을 import합니다.
import axios from 'axios';

const LoginForm = ({ handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">로그인</button>
    </form>
  );
};

const LoginPage = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault(); // 이벤트 기본 동작 방지

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // 로그인 성공 처리
        console.log('로그인 성공!');
        setLoggedIn(true);
        setLoginError(null);
      } else {
        // 로그인 실패 처리
        console.error('로그인 실패!');
        setLoggedIn(false);
        setLoginError('로그인에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      console.error('로그인 요청 중 오류 발생:', error);
      setLoggedIn(false);
      setLoginError('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className={`wrapper${formSuccess ? ' form-success' : ''}`}>
      <div className="container">
        <h1 className={`${formSuccess ? 'form-success' : ''}`}>Welcome</h1>

        {!loggedIn ? (
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="사용자 이름" name="username" />
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
