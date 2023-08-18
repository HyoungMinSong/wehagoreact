import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pages/login/Alert1.css';
import SignUpHeaderLogin1 from './pages/signUp/SignUpHeaderLogin1';
import WithdrawalModal from './pages/commons/WithdrawalModal';
import { styled } from 'styled-components';

const ModalBackGround = styled.div`
  background-color: gray;
  opacity: 80%;
  /* 모달창 크기 */
    width: 100%;
    height: 100%;

    /* 최상단 위치 */
    z-index: 998;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동 */
    position: absolute;
    top: 0px;
    left: 0px;
`;


const ExceptionNotFound = () => {

  const [modalSwitch, setModalSwitch] = useState(false);

  

  const handleWithdraw = () => {
    setModalSwitch(true);
  }


  // 로그아웃 버튼 눌렀을 때
  const logoutHandler = () => {
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`; // 쿠키에 있는 Access Token 지우기
    localStorage.removeItem("persist:root");
    window.location.replace('/login'); // 로그인 창으로 가기
  }

  return (
    <>
    <div style={{background:"#333948"}}><SignUpHeaderLogin1/></div>
    {modalSwitch && <ModalBackGround />}
    <div className='Alert1-OuterContainer'>
      <div className='Alert1-Container'>
        <h1 className='Alert1-Title'>연결된 회사가 없습니다.</h1>
        <div className='Alert1-Content'>
          소속된 회사가 없어 WEHAGO 서비스를 이용할 수 없습니다.<br/>
          연결을 원하는 회사의 관리자에게 초대메일을 요청해 연결한 후 접속해주세요.<br />
          더 이상 WEHAGO 이용을 원하지 않을 경우, <a className='aTag' onClick={handleWithdraw}>회원탈퇴</a>가 가능합니다.
        </div>
        {modalSwitch && <WithdrawalModal setModalSwitch={setModalSwitch} />}
        <div style={{display:"flex", justifyContent:"space-between", width:"300px"}}>
            <button className='Alert2-Button' onClick={logoutHandler}>로그아웃</button>
            <Link to="/">
            <button className='Alert1-Button'>WEHAGO 홈</button>
            </Link>
        </div>
      </div>
    </div>
    </>
  );
};


export default ExceptionNotFound;
