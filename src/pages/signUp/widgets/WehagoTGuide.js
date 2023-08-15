import React, { useState, useEffect } from "react";
import Options from "./Options";
// import ClipLoader from "react-spinners/ClipLoader";



const WehagoTGuide = (props) => {
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
      <div className=" mx-3 mt-4 mb-2 small-text">
      <a href="https://youtube.com/playlist?list=PL6C7R4G46Hi1iOmsb7rFQKfpAF2JaBUlq" style={{
            color: 'white',       // 흰색 텍스트
            fontWeight: 'bold'
          }} target="_blank"><p>➢ 위하고 T 가이드 동영상 보러가기.</p></a>
      </div>
    </div>
    <div className=" my-4">
        <Options options={options} title="" {...props} />
        </div>
  </div>
  );
};

export default WehagoTGuide;