import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";
import { Image } from "react-bootstrap";
import Options from "./Options";

const Statistics = (props) => {
  const options = [
    {
        name: "처음으로",
        handler: () => {
          // '처음으로' 옵션이 선택되었을 때의 처리
          props.actionProvider.handleOptions(); // ActionProvider의 handleOptions 함수 호출
        },
        id: 1,
    },
    // 다른 동영상 가이드 옵션들을 추가할 수 있습니다.
];

  return (
    <div>
      <div className="stats">
        <div className=" mx-3 mt-3 mb-1 small-text">
          <p>일반기업 회원가입 WEB 버전</p>
          <p><Link style={{
            color: 'white',       // 흰색 텍스트
            fontWeight: 'bold'
          }} to={'/'} target="_blank">WEHAGO 사이트(www.wehago.com)</Link> 접속 후 우측상단 "회원가입" 버튼을 클릭합니다.</p>
        </div>
      </div>
      <div className="stats mt-3 ">
      <Image src={require('../howsignup.png')} alt="" className="rounded" style={{ width: '100%' }}/>
      </div>
      <div className=" my-4">
        <Options options={options} title="" {...props} />
        </div>
    </div>
    
  );
};

export default Statistics;