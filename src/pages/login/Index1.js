import React, { useState, useEffect, useRef } from "react";
import SignUpHeaderindex from "../signUp/SignUpHeaderindex";
import Footer from "../main/Footer";
import "./Index1.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BluetoothSearchingOutlinedIcon from "@mui/icons-material/BluetoothSearchingOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import SignUpHeaderIndexFix from "../signUp/SignUpHeaderIndexFix";
import IndexPackage from "./IndexPackage";
import Chatbot from "react-chatbot-kit";
import config from '../signUp/config';
import MessageParser from '../signUp/MessageParser';
import ActionProvider from '../signUp/ActionProvider';
import "../signUp/chat.css";

const IndexBackground = () => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  const images = [
    {
      imageSrc:
        "https://static.wehago.com/html/landing/img/wehagot/thumb_mv4.png",
      videoUrl: "https://www.youtube.com/embed/GBhYhawGUfM",
    },
    {
      imageSrc:
        "https://static.wehago.com/html/landing/img/wehagot/thumb_mv2.png",
      videoUrl: "https://www.youtube.com/embed/aJhXMINdFFs",
    },
    {
      imageSrc:
        "https://static.wehago.com/html/landing/img/wehagot/thumb_mv3.png",
      videoUrl: "https://www.youtube.com/embed/IOn9yEk8INU",
    },
    {
      imageSrc:
        "https://static.wehago.com/html/landing/img/wehagot/thumb_mv5.png",
      videoUrl: "https://www.youtube.com/embed/JuV444uwv3c",
    },
    {
      imageSrc:
        "https://static.wehago.com/html/landing/img/wehagot/thumb_mv6.png",
      videoUrl: "https://www.youtube.com/embed/nhk6l3LCvSc",
    },
    // Add more image and video entries as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    const videoUrl = images[index].videoUrl;
    const iframe = document.getElementById("videoIframe");
    if (iframe) {
      iframe.src = videoUrl;
    }
  };

  const sectionsRef = {
    serviceIntroduction: useRef(null),
    mobile: useRef(null),
    pricingGuide: useRef(null),
    // ... (add more refs as needed)
  };

  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [showBot, toggleBot] = useState(false);

  return (
    
      <div className="background-image-insert">
        <SignUpHeaderIndexFix
          handleScroll={handleScroll}
          sectionsRef={sectionsRef}
        />
        <div className="wrappingContainer">
          <div className="background-container">
            <div className="background-container-index">
              <h2 className="title-index1">
                기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
              </h2>
              <h2 className="title-index2">WEHAGO</h2>
              <h2 className="title-index3">
                업무에 필요한 모든 서비스를 한 공간에서!
                <br />
                Smart A 10으로 전문적인 경영관리와 쉽고 편리한 협업을
                경험해보세요
              </h2>
            </div>
            <div className="page-content" style={{ height: pageHeight }}>
              <div className="video-container">
                <h2
                  className="title-index4"
                  ref={sectionsRef.serviceIntroduction}
                >
                  <b>쉽게, 편리하게, 다함께 WEHAGO</b>
                </h2>
                <div
                  className="gray-box"
                  onClick={() => handleImageClick(currentImageIndex)}
                >
                  <iframe
                    id="videoIframe" // Added an ID to the iframe element
                    width="900"
                    height="500"
                    src={images[currentImageIndex].videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h2 className="description">
                    {images[currentImageIndex].description}
                  </h2>
                </div>
              </div>
              <div className="image-list-horizontal">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img src={image.imageSrc} alt={`Image ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="additional-image-container">
                <div className="row">
                  <div className="col-7">
                    <img
                      src="https://static.wehago.com/html/landing/img/v2/bg_mobile.png"
                      alt="Additional Image"
                      style={{ width: "90%" }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-5 ">
                    <div className="m-4 d-flex justify-content-center ">
                      <div className="bbb"></div>
                      <div className="ccc" style={{ width: "500px" }}>
                        <div className="my">
                          <div
                            className="title-index5"
                            style={{ marginTop: "160px", fontSize: "40px" }}
                            ref={sectionsRef.mobile}
                          >
                            <b>WEHAGO 모바일</b>
                          </div>
                          <div
                            className="title-index6 mt-3 text-muted"
                            style={{ fontSize: "25px" }}
                          >
                            WEHAGO를 더 스마트하게 사용하는 방법
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="semi-transparent-div">
                              <div
                                className="left1-container"
                                style={{ marginTop: "60px" }}
                              >
                                <div
                                  className="left-container"
                                  style={{ marginBottom: "60px" }}
                                >
                                  <div className="title-index7">
                                    <NotificationsNoneOutlinedIcon
                                      style={{
                                        fontSize: "80px",
                                        marginBottom: "10px",
                                      }}
                                      className="text-primary"
                                    />
                                    <div className="index7-1 mb-4">
                                      <b style={{ fontSize: "18px" }}>
                                        실시간 알림
                                      </b>
                                    </div>
                                  </div>
                                  <div className="title-index8 text-muted">
                                    각 서비스 알림을 즉시 받아
                                    <br />
                                    신속한 업무 진행이
                                    <br />
                                    가능합니다.
                                  </div>
                                </div>
                                <div className=""></div>
                                <div className="title-index13">
                                  <ImportantDevicesOutlinedIcon
                                    style={{
                                      fontSize: "80px",
                                      marginBottom: "10px",
                                    }}
                                    className="text-primary"
                                  ></ImportantDevicesOutlinedIcon>
                                  <div className="index13-1 mb-4">
                                    <b style={{ fontSize: "18px" }}>
                                      모바일만의 쉬운 사용환경
                                    </b>
                                  </div>
                                </div>
                                <div className="title-index14 text-muted">
                                  사용이 쉬운 모바일로
                                  <br />
                                  WEHAGO를 더 스마트하게
                                  <br />
                                  사용할 수 있습니다.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div
                              className="right1-container"
                              style={{ marginTop: "60px" }}
                            >
                              <div
                                className="right-container"
                                style={{ marginBottom: "60px" }}
                              >
                                <div className="title-index9">
                                  <BluetoothSearchingOutlinedIcon
                                    style={{
                                      fontSize: "80px",
                                      marginBottom: "10px",
                                    }}
                                    className="text-primary"
                                  ></BluetoothSearchingOutlinedIcon>
                                  <div className="index9-1 mb-4">
                                    <b style={{ fontSize: "18px" }}>
                                      언제 어디서나 사무실처럼
                                    </b>
                                  </div>
                                </div>
                                <div className="title-index10 text-muted">
                                  WEHAGO 모바일을 통해
                                  <br />
                                  외근중에도 편리하게
                                  <br />
                                  소통할 수 있습니다.
                                </div>
                              </div>
                              <div className="title-index11">
                                <QuestionAnswerOutlinedIcon
                                  style={{
                                    fontSize: "80px",
                                    marginBottom: "10px",
                                  }}
                                  className="text-primary"
                                ></QuestionAnswerOutlinedIcon>
                                <div className="index11-1 mb-4">
                                  <b style={{ fontSize: "18px" }}>
                                    WEHAGO 컨텐츠 공유
                                  </b>
                                </div>
                              </div>
                              <div
                                className="title-index12 text-muted"
                                style={{ marginBottom: "50px" }}
                              >
                                연락처, 거래처 등<br></br>WEHAGO 서비스 컨텐츠를
                                <br></br>공유하며 협업할 수 있습니다.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={sectionsRef.pricingGuide}>
                  <IndexPackage/>
                </div>
                <div style={{ background: "#333948",  marginTop: "80px" }}>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showBot && (
        <div>
          <div className="app-chatbot-container">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </div>
      )}

      <div>
        <button
          className="app-chatbot-button"
          onClick={() => toggleBot((prev) => !prev)}
        >
          <div>Bot</div>
          <svg viewBox="0 0 640 512" className="app-chatbot-button-icon">
            <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
                                }

export default IndexBackground;
                                
