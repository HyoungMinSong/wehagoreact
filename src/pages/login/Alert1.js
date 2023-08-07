import React from 'react';
import { Link } from 'react-router-dom';
import './Alert1.css';
import SignUpHeader from '../signUp/SignUpHeader';

const Alert1 = () => {
  return (
    <>
     <SignUpHeader></SignUpHeader>
    <div className='Alert1-OuterContainer'>
      <div className='Alert1-Container'>
        <h1 className='Alert1-Title'>유효하지 않은 링크입니다.</h1>
        <div className='Alert1-Content'>
          프로모션 코드의 유효기간이 만료되었거나,<br />
          초대한 관리자의 설정변경 등의 이유로 링크가 만료되었습니다.<br />
          WEHAGO 홈으로 이동해 아이디를 찾거나, 관리자에게 문의하세요
        </div>

        <Link to="/index1">
          <button className='Alert1-Button'>WEHAGO 홈</button>
        </Link>
      </div>
    </div>
    </>
  );
};


export default Alert1;
