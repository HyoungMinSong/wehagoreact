import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosApi from "../../AxiosApi";
import jwt_decode from 'jwt-decode';
import SignUpHeader1 from '../signUp/SignUpHeaderlogin';


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
  let location = useLocation();
  const [formSuccess, setFormSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { empNo } = location.state || {};

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

        // 발급 받은 Access Token 쿠키에 등록
        const accessToken = response.data.accessToken;
        const decodedAccessToken = jwt_decode(accessToken);
        const accessTokenExpiration = new Date(decodedAccessToken.exp * 1000);

        // Access Token을 쿠키에 등록
        const expires = accessTokenExpiration.toUTCString();
        document.cookie = `accessToken=${accessToken}; path=/; expires=${expires}`;
        // 로그인한 id, pw 로 user_no를 조회하고 업데이트
        await axiosApi.post('/updateinvite', {params : {
          userid: username,
          password: password,
          empNo : empNo,
        }});
        console.log(empNo);


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

     // 액세스 토큰이 유효한 경우 로그인 페이지 접속 차단
  const isAccessTokenValid = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedAccessToken = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;
      return decodedAccessToken.exp > currentTime;
    }
    return false;
  };


  
  useEffect(() => {
    if (isAccessTokenValid()) {
      // 액세스 토큰이 유효한 경우, 메인 페이지 또는 원하는 다른 페이지로 리다이렉트
      navigate('/main'); // 메인 페이지로 리다이렉트 예시
    }
  }, [navigate]);


  return (
    <div>
    <div className="jongwonscss">
      <div className={`wrapper${formSuccess ? ' form-success' : ''}`}>
      <SignUpHeader1>
    </SignUpHeader1>
        <div className="container">
          <h1 className={`${formSuccess ? 'form-success text-white' : 'text-white'}`}>W E H A G O</h1>

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
                <Link to="/s/en40">회원가입</Link> {/* 회원가입 페이지로 이동하는 링크 추가 */}
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
    </div>
  );
};

export default LoginPage;