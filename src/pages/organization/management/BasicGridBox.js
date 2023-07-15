import { styled, css } from "styled-components";
import React, { useState } from 'react';
import Img2 from "../images/img2.gif";

const WrappingGridBox = styled.div`
  height: 100%;
  .realMovingTable{
    height: calc(100% - 2px);
    border-width: 2px 1px 1px;
      border-style: solid;
      border-color: rgb(0, 0, 0) rgb(225, 225, 225) rgb(225, 225, 225);
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      transition: width 0.5s;
      ${props =>
        props.isExpanded &&
        css`
        width: 50%;
        transition: width 0.5s;
        `
      }
    }
    .WrappingTable{
      position: absolute;
      left: 0px;
      top: 0px;
      background: rgb(255, 255, 255);
      border-style: none;
      border-width: 0px;
      cursor: default;
      width: 100%;
      height: 100%;
    }
    .movingTable{
      height: 100%;
      overflow: auto;
      display: flex;
      word-break:break-all;
      white-space:nowrap;
    }
    tr, td, th{
      border-style: solid;
      border-width: 1px;
      height: 30px;
      font-size: 13px;
      word-break:break-all;
    }
    tr{
      max-height: 30px;
    }
    th{
      background-color: #EFEFFB;
    }
    caption{
      border-top: black;
      border-top-width: 1px;
      border-top-style: solid;
    }
    table{
      width: 100%;
    }
    .user-detail{
      width: 50%;
      height: 100%;
      border: 1px solid #ccc;
      overflow: auto;
      position: absolute;
      top: 0;
      right: 0;
      margin-left: 10px;
      background: #fff;
      transition: width 0.5s;
      ${props =>
       !props.isExpanded &&
        css`
          width: 0%;
          transition: width 0.5s;
        `
      }
    }
`;
    
const WrappingDetailBox = styled.div`
    .detailBoxTit{
      margin: 5px 10px 0px;
      position: relative;
      min-height: 22px;
      padding: 5px 0;
    }
    h2{
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      color: #000;
      vertical-align: top;
    }
    .detailBoxButtonBox{
      position: absolute;
      top: 2px;
      right: 0;
    }
    .detailBoxBB{
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgb(211, 211, 211);
      background: rgb(255, 255, 255);
      color: rgb(74, 74, 74);
      text-decoration: none;
      font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      font-size: 12px;
      height: 27px;
      letter-spacing: -0.5px;
      line-height: initial;
      padding: 1px 10px 0px;
      width: auto;
      margin-left: 4px;
    }
    .detailBoxBX{
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
    .detailBoxInBox{
      padding: 10px 0 0 10px;
      position: relative;
    }
    .detailBoxStaffInfo{
      text-align: left;
      position: relative;
      padding: 22px;
      background: #12a4f7;
    }
    .detailBoxStaffFace{
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 20px;
      width: 65px;
      height: 65px;
      margin-top: -32px;
      border-radius: 65px;
    }
    .hiddingInput{
      display: none;
    }
    .detailBoxStaffPhoto{
      border-radius: 65px;
      width: 100%;
      border: 0;
      vertical-align: top;
    }
    .detailBoxStaffBt{
      margin-left: 80px;
    }
    .detailBoxProfInfo{
      text-align: left;
      margin-left: 100px;
      font-size: 18px;
      color: #fff;
    }
    .detailBoxProfId{
      display: inline-block;
      margin: 2px 0 0 10px;
      padding-left: 7px;
      border-left: 1px solid #89d2fb;
      font-size: 13px;
      color: #b5daff;
      vertical-align: top;
    }
    .detailBoxProfButton{
      display: inline-block;      
      margin-left: 100px;
    }
    .profPhotoInButton{
      box-sizing: border-box;
      cursor: pointer;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background: none;
      color: rgb(255, 255, 255);
      text-decoration: none;
      font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      font-size: 13px;
      height: 27px;
      letter-spacing: -0.5px;
      line-height: initial;
      padding: 5px 15px;
      width: auto;
      margin-left: 7px;
      margin-top: 7px;
    }
    .profPhotoInInput{
      cursor: pointer;
      position: absolute;
      inset: 0px;
      width: 100%;
      opacity: 0;
      display: none;
    }
    .profPhotoOutButton{
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      background: none;
      color: rgb(255, 255, 255);
      text-decoration: none;
      font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      font-size: 13px;
      height: 27px;
      letter-spacing: -0.5px;
      line-height: initial;
      padding: 5px 15px;
      width: auto;
      margin: 7px;
    }
    .profPhotoGuideText{
      margin-top: 8px;
      font-size: 12px;
      color: #d2e9ff;
      margin-left: 100px;
      margin-bottom:0;
    }
    .profPhotoGuideText1{
      font-size: 12px;
      color: #d2e9ff;
      margin-left: 100px;
      margin-bottom:0;
    }
    .detailBoxFormButton{
      padding: 10px 0 20px;
      text-align: center;
    }
    .detailBoxFormCancelButton{
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgb(211, 211, 211);
      background: rgb(255, 255, 255);
      color: rgb(74, 74, 74);
      text-decoration: none;
      font-size: 16px;
      font-family: "Nanum Square", "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      height: 37px;
      line-height: initial;
      padding: 1px 20px 0px;
      width: auto;
      margin-top: 8px;
    }
    .detailBoxFormSaveButton{
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgb(28, 144, 251);
      background: rgb(28, 144, 251);
      color: rgb(255, 255, 255);
      text-decoration: none;
      font-size: 16px;
      font-family: "Nanum Square", "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      height: 37px;
      line-height: initial;
      padding: 1px 20px 0px;
      width: auto;
      margin-top: 8px;
      margin-left: 5px;
    }
    .detailBoxInputForm{
      width: auto;
      position: static;
      min-width: 140px;
      margin-top: 20px;
    }
    .detailBoxInputFormTit{
      position: relative;
      min-height: 22px;
      padding: 5px 0;
    }
    .detailBoxInputFormTit > h2{
      font-size: 15px;
      line-height: 22px;
      color: #000;
      vertical-align: top;
    }
    .detailBoxInputArea{
      width: 100%;
      border: 0;
      border-collapse: separate;
      border-top: 2px solid #646464;
      border-bottom: 1px solid #e5e5e5;
      table-layout: fixed;
      border-spacing: 0;
    }
`;



function BasicGridBox(){
      
  // 사용자 데이터 예시
  const userData = [
    { id: 'rlagptjd2002', name: '김혜성', email: 'rlagptjd2002@naver.com' },
    { id: 'choijong0801', name: '최종원', email: 'janesmith@example.com' },
    { id: 'songhyungmin', name: '송형민', email: 'bobjohnson@example.com' },
    { id: 'leejuyong', name: '이주용', email: 'bobjohnson@example.com' },
    { id: 'rlagptjd2002', name: '김혜성', email: 'rlagptjd2002@naver.com' },
    { id: 'choijong0801', name: '최종원', email: 'janesmith@example.com' },
    { id: 'songhyungmin', name: '송형민', email: 'bobjohnson@example.com' },
    { id: 'leejuyong', name: '이주용', email: 'bobjohnson@example.com' },
    { id: 'rlagptjd2002', name: '김혜성', email: 'rlagptjd2002@naver.com' },
    { id: 'choijong0801', name: '최종원', email: 'janesmith@example.com' },
    { id: 'songhyungmin', name: '송형민', email: 'bobjohnson@example.com' },
    { id: 'leejuyong', name: '이주용', email: 'bobjohnson@example.com' },
    { id: 'rlagptjd2002', name: '김혜성', email: 'rlagptjd2002@naver.com' },
    { id: 'choijong0801', name: '최종원', email: 'janesmith@example.com' },
    { id: 'songhyungmin', name: '송형민', email: 'bobjohnson@example.com' },
    { id: 'leejuyong', name: '이주용', email: 'bobjohnson@example.com' },
    { id: 'rlagptjd2002', name: '김혜성', email: 'rlagptjd2002@naver.com' },
    { id: 'choijong0801', name: '최종원', email: 'janesmith@example.com' },
    { id: 'songhyungmin', name: '송형민', email: 'bobjohnson@example.com' },
    { id: 'leejuyong', name: '이주용', email: 'bobjohnson@example.com' }
  ];
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsExpanded(true);
  };
  const handleXClick = () => {
    setIsExpanded(false);
  };
  
  return(
    <WrappingGridBox isExpanded={isExpanded}>
      <div className="realMovingTable">
        <div className="WrappingTable">
          <div className="movingTable">
            <table>
              <thead>
                <tr>
                  <th>V</th>
                  <th>이름</th>
                  <th>소속</th>
                  <th>직급</th>
                  <th>이메일주소</th>
                  <th>유선전화번호</th>
                  <th>휴대전화번호</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className={selectedUser === user ? 'selected' : ''}
                  >
                    <td><input type="checkbox" /></td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>010-9370-4871</td>
                    <td>3조</td>
                    <td>인턴</td>
                    <td>사용중</td>
                  </tr>   
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        {selectedUser && (
          <div className="user-detail">
            <WrappingDetailBox>
              <div className="detailBoxTit">
                <h2>직원정보</h2>
                <div className="detailBoxButtonBox">
                  <button type="button" className="detailBoxBB">사용중지</button>
                  <button type="button" className="detailBoxBB">퇴사</button>
                  <button type="button" className="detailBoxBX" onClick={handleXClick}>X</button>
                </div>
              </div>
              <div className="detailBoxInBox">
                <div className="detailBoxStaffInfo">
                  <div className="detailBoxStaffFace">
                    <div>
                      <input type="file" className="hiddingInput" />
                    </div>
                    <img src={Img2} alt="프로필사진" className="detailBoxStaffPhoto" />
                  </div>
                  <div className="detailBoxProfBt">
                    <div className="detailBoxProfInfo">
                      {selectedUser.name}
                      <span className="detailBoxProfId">{selectedUser.id}</span>
                    </div>
                    <div>
                      <div className="detailBoxProfButton">
                        <button type="button" id="fileupload" className="profPhotoInButton">등록</button>
                        <input type="file" className="profPhotoInInput" />
                      </div>
                      <button type="button" className="profPhotoOutButton">삭제</button>
                      <p className="profPhotoGuideText">프로필 사진을 등록 또는 삭제한 후 저장 버튼을 클릭해주세요.</p>
                      <p className="profPhotoGuideText1">이미지 최대사이즈 50*50px, 용량 500KB 미만</p>
                    </div>
                  </div>
                </div>
                <div className="detailBoxInputForm">
                  <div className="detailBoxInputTit">
                    <h2>기본정보</h2>
                  </div>
                  <table className="detailBoxInputArea">
                    <caption></caption>
                    <colgroup><col></col></colgroup>
                    <tbody>
                      <tr><th>이름</th><td>{selectedUser.name}</td></tr>
                      <tr><th>소속</th><td>더존</td></tr>
                      <tr><th>직급</th><td>인턴</td></tr>
                      <tr><th>직책</th><td>팀원</td></tr>
                      <tr><th>유선전화번호</th><td>0212341234</td></tr>
                      <tr><th>입사일</th><td>2023.07.14</td></tr>
                      <tr><th>이메일주소</th><td>{selectedUser.email}</td></tr>
                      <tr><th>휴대전화번호</th><td>01011112222</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="detailBoxFormButton">
                <button type="button" className="detailBoxFormCancelButton">취소</button>
                <button type="button" className="detailBoxFormSaveButton">저장</button>
              </div>
            </WrappingDetailBox>
          </div>
        )}
    </WrappingGridBox>
  );
}export default BasicGridBox;