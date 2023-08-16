import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ModalWrapper = styled.div`
  /* 모달창 크기 */
  width: 80%;
  height: 80%;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동 */
  position: absolute;
  top: 60px;
  left: 10%;

  /* 모달창 디자인 */
  background: white;
  border: none;
  // border-radius: 10px;
  min-height: 550px;
  overflow-y: auto;

  .upperWrapper {
    margin: 3%;
  }
  .spaceBetween {
    display: flex;
    justify-content: space-between;
  }
  .backGroundGray{
    background-color: #F2F2F2;
    height: 100px;
    border: solid 1px;
    border-color: lightgray;
    overflow-y: auto;
  }
  .backGroundPink{
    background-color: #FBEFF2;
    height: 200px;
    border: solid 1px;
    border-color: lightgray;
    overflow-y: auto;
  }
  .wrappingThings{
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left: 3%;
    padding-right: 3%;
    // min-height: 200px;
  }
  .wrappingRedThings{
    color: red;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .wrappingBlackThings{
    font-size: 12px;
  }
  .boldSpan{
    font-weight: bold;
  }
  .size-up{
    font-size: 25px;
  }
  .flex-start{
    display: flex;
  }
  .flex-center{
    display: flex;
    justify-content: center;
  }
  input[type="text"]{
    width:100%;
    margin-bottom: 5px;
  }
  .detailBoxBX {
    margin-left: 4px;
    width: 27px;
    height: 27px;
    padding: 0;
    display: inline-block;
    position: relative;
    border: 0;
    background: 0 0;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
  }
`;

function WithdrawalModal(props) {

  const handleXClick = () => {
    props.setModalSwitch(false);
  }

  return (
    <ModalWrapper>
      <div className="upperWrapper">
        <div className="spaceBetween">
          <span className="boldSpan">회원탈퇴</span>
          <button
            type="button"
            className="detailBoxBX"
            onClick={handleXClick}
          >
            Ｘ
          </button>
        </div>
        <div className="backGroundPink">
          <div className="wrappingThings">
            <div className="wrappingRedThings">
              회원탈퇴 시 개인정보 및 WEHAGO에서 만들어진 모든 데이터는 삭제됩니다.<br></br>
              (단, 아래 항목은 표기된 법률에 따라 특정 기간 동안 보관됩니다.)<br></br>
            </div>
            <div className="wrappingBlackThings">
              1. 계약 또는 청약철회 등에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 / 보존 기간 : 5년<br></br>
              2. 대금결제 및 재화 등의 공급에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 / 보존 기간 : 5년<br></br>
              3. 전자금융 거래에 관한 기록 보존 이유 : 전자금융거래법 보존 기간 / 5년<br></br>
              4. 소비자의 불만 또는 분쟁처리에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 보존 기간 / 3년<br></br>
              5. 신용정보의 수집/처리 및 이용 등에 관한 기록 보존 이유 : 신용정보의 이용 및 보호에 관한 법률 보존기간 / 3년<br></br>
              6. 전자(세금)계산서 시스템 구축 운영하는 사업자가 지켜야 할 사항 고시(국세청 고시 제 2016-3호) (전자세금계산서 사용자에 한함) : 5년<br></br>
              (단, (세금)계산서 내 개인식별번호는 3년 경과 후 파기)
            </div>
          </div>
        </div>
        <span className="boldSpan size-up">·</span>
        <span className="boldSpan">유의사항</span>
        <div className="backGroundGray">
          <div className="wrappingThings">
            <div className="wrappingBlackThings">
              - 회원탈퇴 처리 후에는 회원님의 개인정보를 복원할 수 없으며, 회원탈퇴 진행 시 해당 아이디는 영구적으로 삭제되어 재가입이 불가합니다.<br></br>
              - 소속된 회사가 존재할 경우, '탈퇴'회원으로 조회됩니다.<br></br>
              - 회사가 WEHAGO 내에 존재하는 경우, 회사에 귀속된 데이터에 대해서는 보관 됩니다.
            </div>
          </div>
        </div>
        <div>
        <span className="boldSpan size-up">·</span>
          <span className="boldSpan">
            탈퇴사유
          </span>
        </div>
        <div>
          <input type="text" placeholder="탈퇴사유를 적어라" />
        </div>
        <div className="flex-start">
          <input type="checkbox" />
          <span className="small-text">해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.</span>
        </div>
        <br></br>
        <div className="flex-center">
          <button type="button">회원탈퇴</button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default WithdrawalModal;
