import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import axiosApi from "../../AxiosApi";
import jwt_decode from 'jwt-decode';

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
      // JWT 토큰 발급
      const response = await axiosApi.post('/api/login', {
          userid: username,
          password: password,
      });
      
      if (response.status === 200) {
        console.log('로그인 성공!');
        setLoggedIn(true);
        setLoginError(null);

        // 발급 받은 Access Token 헤더에 등록
        const accessToken = response.data.accessToken;

        // 로그인 성공 후 Access Token을 localStorage에 저장
        localStorage.setItem('accessToken', accessToken);
        
        // Refresh Token 유효기간 가져오기
        const refreshToken = response.data.refreshToken;
        const decodedRefreshToken = jwt_decode(refreshToken);
        const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);
        
        // Refresh Token을 쿠키에 등록
        const expires = refreshTokenExpiration.toUTCString();
        document.cookie = `refreshToken=${refreshToken}; path=/; expires=${expires}`;

        // 메인 페이지로 넘어가기
        window.location.replace('/main');
      } else if (response.status === 401) {
        console.error('아이디 또는 비밀번호가 올바르지 않습니다.');
        setLoggedIn(false);
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        console.error('로그인 실패!');
        setLoggedIn(false);
        setLoginError('로그인에 실패했습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('아이디 또는 비밀번호가 올바르지 않습니다.');
        setLoggedIn(false);
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else if (!error.response) {
        console.error('로그인 요청 중 오류 발생:', error);
        setLoggedIn(false);
        setLoginError('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="jongwonscss">
      <div className={`wrapper${formSuccess ? ' form-success' : ''}`}>
        <div className="container">
          <h1 className={`${formSuccess ? 'form-success text-white' : 'text-white'}`}>Welcome</h1>

          {!loggedIn ? (
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="아이디" name="username"/>
              <input type="password" placeholder="비밀번호" name="password" />
              <button type="submit" id="login-button">
                로그인
              </button>
              <div className="login-links pt-3">
                <Link to="/findId" className='px-3'>아이디 찾기</Link> {/* 아이디 찾기 페이지로 이동하는 링크 추가 */}
                <Link to="/findpw">비밀번호 찾기</Link> {/* 비밀번호 찾기 페이지로 이동하는 링크 추가 */}
              </div>
              <div className="register-link">
                <Link to="/signup">회원가입</Link> {/* 회원가입 페이지로 이동하는 링크 추가 */}
              </div>
            </form>
          ) : (
            <div className="text-white">로그인 성공!</div>
          )}

          {loginError && <div className="error text-white">{loginError}</div>}
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
    </div>
  );
};

export default LoginPage;
