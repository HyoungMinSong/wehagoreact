import React from "react";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import UrlIcon from "../icons/call.svg";

const ContactLink = () => {
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
      </div>

      );
};

      export default ContactLink;