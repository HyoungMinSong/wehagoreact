import React from 'react';
import { Link } from 'react-router-dom';
import './pages/login/Alert1.css';
import SignUpHeaderLogin1 from './pages/signUp/SignUpHeaderLogin1';

const ExceptionRolePage = () => {
  return (
    <>
    <div style={{background:"#333948"}}><SignUpHeaderLogin1/></div>
    <div className='Alert1-OuterContainer'>
      <div className='Alert1-Container'>
        <h1 className='Alert1-Title'>잘못된 접근입니다.</h1>
        <div className='Alert1-Content'>
          접근할 권한이 없습니다.<br />
          권한이 있는 아이디로 다시 로그인 하거나,<br />
          해당 기능을 제공한 서비스 관리자에게 문의해주세요.
        </div>
        <div style={{display:"flex", justifyContent:"space-between", width:"300px"}}>
            <Link to="/main">
            <button className='Alert2-Button'>메인으로</button>
            </Link>
            <Link to="/">
            <button className='Alert1-Button'>WEHAGO 홈</button>
            </Link>
        </div>
      </div>
    </div>
    </>
  );
};


export default ExceptionRolePage;
