import React, { useState, useEffect } from 'react';
import SignUpHeader from '../signUp/SignUpHeader';
import './Index1.css';

const IndexBackground = () => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  const images = [
    "https://inglish.douzoneedu.co.kr/img/new/renew_main_vimg01n.png",
    "https://inglish.douzoneedu.co.kr/img/new/renew_main_vimg02n.png"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 이미지 변경 주기 (5초마다)

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <>
      <SignUpHeader />
      <div className="background-container">
        <div className="background-container-index">
          <h2 className="title-index1">기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼</h2>
          <h2 className="title-index2">WEHAGO</h2>
          <h2 className="title-index3">업무에 필요한 모든 서비스를 한 공간에서!<br />
            Smart A 10으로 전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요</h2>
        </div>
        <div className="page-content" style={{ height: pageHeight }}>
          {/* 페이지 콘텐츠 내용 추가 */}
        </div>
      </div>
      {/* 이미지를 번갈아가며 출력하는 부분 */}
      <div className="image-carousel-container" style={{ position: 'relative' }}>
        {/* 애니메이션 이미지 */}
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{
            width: '50%',
            height: 'auto',
            display: 'block',
          }}
        />
        {/* 상시로 보이도록 이미지 추가 */}
        <img
          src="/images/image22.png"
          alt="Image"
          style={{
            position: 'absolute',
            top: '30%',
            right: '51%',
            width: '20%',
            height: 'auto',
            maxWidth: '500px', // 최대 너비 설정
          }}
        />
      </div>
    </>
  );
};

export default IndexBackground;
