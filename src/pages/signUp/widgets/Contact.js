import React from "react";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import UrlIcon from "../icons/call.svg";
import Options from "./Options";

const ContactLink = (props) => {
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
          <p>✓ 전화문의 : 1000-5000</p>
          <p>✓ 이용요금(월 기준, VAT별도)</p>
          <p>∙ 운영 시간: 평일 오전 9시~오후 6시</p>
          <p>(공휴일 제외)</p>
        </div>
        </div>
        <div className="stats mt-3">
          <div className="small-text m-3">
            <a href="tel:1999" style={{
            color: 'white'}}>
              <PermPhoneMsgIcon sx={{ fontSize: 35 }} />
              <h5 className="tel-header">  1000 - 5000  </h5>

            </a>
          </div>
        </div>
        <div className=" my-4">
        <Options options={options} title="" {...props} />
        </div>
      </div>

      );
};

      export default ContactLink;