// FindIdResult.js

import React from 'react';
import './FindIdResult.css';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Link } from 'react-router-dom';

const FindIdResult = ({ foundId }) => {
  const handleLoginClick = () => {
    // Handle the login button click here (e.g., navigate to the login page)
  };

  return (
    <div className="find-id-result-container">
      <div className="find-id-result-wrapper">
        <h2 className="find-id-result-title">
          <PortraitIcon fontSize='large' /> 아이디 확인
        </h2>
        <h6 className="find-id-result-title2">찾으신 회원님의 아이디를 확인하세요.</h6>
        <div className="find-id-result-content">
          <p className="find-id-result-message">회원님의 아이디는</p>
          <p className="find-id-result-id">{foundId}</p>
          <div className="find-id-result-note">
            <p>가입 시 입력하신 정보는 로그인 후 [개인설정]에서 확인하실 수 있습니다.</p>
          </div>
          <Link to="/login" className="find-id-result-login-button">
            로그인
          </Link>
          <Link to="/findpw" className="find-id-result-password-recovery-link">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindIdResult;
