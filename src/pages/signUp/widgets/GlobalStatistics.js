import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";
import { Image } from "react-bootstrap";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData();

      // const filteredFlights = flights.filter((item) => item.Status === null);

      setStats(stats);
      setLoading(false);
    };
    getStats();
  }, []);

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
    </div>
  );
};

export default Statistics;