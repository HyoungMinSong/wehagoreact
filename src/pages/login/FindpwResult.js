import React from 'react';
import './FindpwResult.css';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const FindPwResult = ({ foundPw }) => {
const handleLoginClick = () => {
// Handle the login button click here (e.g., navigate to the login page)
};

return (
<div className="find-pw-result-container">
<div className="find-pw-result-wrapper">
<h2 className="find-pw-result-title">
<LockIcon fontSize='large' /> 비밀번호 확인
</h2>
<h6 className="find-pw-result-title2">찾으신 회원님의 비밀번호를 확인하세요.</h6>
<div className="find-pw-result-content">
<p className="find-pw-result-message">회원님의 비밀번호는</p>
<p className="find-pw-result-pw">{foundPw}</p>
<div className="find-pw-result-note">
<p>가입 시 입력하신 정보는 로그인 후 [개인설정]에서 확인하실 수 있습니다.</p>
</div>
<Link to="/login" className="find-pw-result-login-button">
로그인
</Link>
</div>
</div>
</div>
);
};

export default FindPwResult;