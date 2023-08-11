import React from 'react';
import './FindIdResult.css';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Link, useLocation } from 'react-router-dom';
import './FindIdForm.js';
import SignUpHeader from '../signUp/SignUpHeader';

const FindIdResult = () => {
  const location = useLocation(); // useLocation 훅을 추가
  const { foundId } = location.state || {};
  // 콘솔에 출력
  console.log('Found ID:', { foundId });

  return (
    <>
      <SignUpHeader></SignUpHeader>
      <div className="find-id-result-container">
        <div className="find-id-result-wrapper">
          <h2 className="find-id-result-title">
            <PortraitIcon fontSize='large' /> 아이디 확인
          </h2>
          <h6 className="find-id-result-title2">찾으신 회원님의 아이디를 확인하세요.</h6>
          <div className="find-id-result-content">
            <p className="find-id-result-message">회원님의 아이디는</p>
            <p className="find-id-result-id">{foundId}</p> {/* foundId를 직접 출력 */}
            <div className="find-id-result-note">
              <p>가입 시 입력하신 정보는 로그인 후 [개인설정]에서 확인하실 수 있습니다.</p>
            </div>
            <Link to="/findpw" className="find-id-result-password-recovery-link">
              비밀번호 찾기
            </Link>
            <Link to="/login" className="find-id-result-login-button">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindIdResult;
