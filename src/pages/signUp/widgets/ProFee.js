import React, { useState, useEffect } from "react";
import Options from "./Options";
// import ClipLoader from "react-spinners/ClipLoader";


const ProFee = (props) => {
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
        <p>➢ PRO 요금제</p><br/>
          <p>✓ 이용요금(월 기준, VAT별도)</p>
          <p>∙ 기본 이용료 월 30,000원</p>
          <p>∙ 사용자당 6,000원/월</p>
          <br/>
          <p>✓ 기본제공서비스</p>
          <p>
          <span> ∙ 팩스 </span><span> ∙ 화상회의 </span>
          <span> ∙ 웹스토리지 </span></p>
          <p>
          <span> ∙ 내 PC 원격접속 </span>
          <span> ∙ 회사저장공간 </span></p>
          <p>
          <span> ∙ 메신저 </span>
          <span> ∙ 메일 </span><span> ∙ 노트 </span></p>
          <p>
          <span> ∙ 회사게시판 </span>
          <span> ∙ 웹오피스팩 </span></p>
        </div>
        </div>
        <div className=" my-4">
        <Options options={options} title="" {...props} />
        </div>
    </div>
  );
};

export default ProFee;