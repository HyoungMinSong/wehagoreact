import React, { useState, useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData();

      setStats(stats);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    <div>
      <div className="stats">
        <div className=" mx-3 mt-3 mb-1 small-text">
          <p>➢ CLUB 요금제</p><br/>
          <p>✓ 이용요금(월 기준, VAT별도)</p>
          <p>∙ 기본 이용료 월 20,000원</p>
          <p>∙ 사용자당 3,000원/월</p>
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
          <span> ∙ 메일 </span></p>
        </div>
      </div>
      <div className="stats mt-3">
        <div className="small-text mx-3 mt-3 mb-1">
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
    </div>
  );
};

export default Statistics;