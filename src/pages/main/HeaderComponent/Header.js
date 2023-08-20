import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { styled } from "styled-components";
import CompanyModal from "./CompanyModal";
import UserModal from "./UserModal";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChatBotImg from "../1538298822.svg";
import Chatbot from "react-chatbot-kit";
import config from "../../signUp/config";
import MessageParser from "../../signUp/MessageParser";
import ActionProvider from "../../signUp/ActionProvider";
import "../../signUp/chat.css";
import AlarmModal from "./AlarmModal";
import GuideModal from "./GuideModal";
import axiosApi from "../../../AxiosApi";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #dddddd;
  padding: 0px 30px;
`;

const Area = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin: 0px 10px;
  background-color: rgba(0, 0, 0, 0);
  border: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

const CompanyButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding-right: 15px;
  border: 1px solid #dddddd;
  border-radius: 20px;
  cursor: pointer;

  & > span {
    color: black;
    font-size: 14px;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: rgba(0, 0, 0, 0);
  cursor: pointer;

  #detail {
    margin: 0px 12px 0px 10px;
  }

  & > div > span {
    color: black;
    font-size: 14px;
    margin-left: 5px;
  }

  & > img {
    border-radius: 100%;
  }
`;

const AlarmContainer = styled.div`
  position: relative;
`;

const GuideContainer = styled.div`
  position: relative;
`;

function Header(props) {
  const [showBot, toggleBot] = useState(false);
  const { user, employeeNo, company, companyName, setCompanyName } = props;
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [alarmModalOpen, setAlarmModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const selectedCompanyRank = company.find(
    (item) => item.t_company_name === companyName
  )
    ? company.find((item) => item.t_company_name === companyName)
        .t_employee_position
    : "";
  // 알림 목록
  const [alarmList, setAlarmList] = useState([]);
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    fetchLogList();
  }, []);

  useEffect(() => {
    if (!alarmModalOpen) {
      alarmList.some((item) => item.t_log_state === 0) && requestUpdateLog();
    } else {
      fetchLogList();
    }
  }, [alarmModalOpen]);

  // 로그 목록 요청
  const fetchLogList = async () => {
    const resp = await axiosApi.get("/findLogByEmployee", {
      params: {
        t_employee_no: employeeNo,
      },
    });
    setAlarmList(resp.data);
    setCount(alarmList.length);
    setIndexOfLastPost(currentPage * 5);
    setIndexOfFirstPost(indexOfLastPost - 5);
    setCurrentPosts(alarmList.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    setCount(alarmList.length);
    setIndexOfLastPost(currentPage * 5);
    setIndexOfFirstPost(indexOfLastPost - 5);
    setCurrentPosts(alarmList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, alarmList]);

  // 로그 상태 갱신
  const requestUpdateLog = () => {
    axiosApi.put("/updateLogByEmployee", parseInt(employeeNo));
  };

  const showCompanyModal = () => {
    setCompanyModalOpen((preState) => !preState);
  };

  const showUserModal = () => {
    setUserModalOpen((preState) => !preState);
  };

  const showAlarmModal = () => {
    setAlarmModalOpen((preState) => !preState);
  };

  const showGuideModal = () => {
    setGuideModalOpen((preState) => !preState);
  };

  return (
    <>
      <Wrapper>
        <Area>
          <a href="/main">
            <img
              src="https://static.wehago.com/imgs/common/wehago_b.svg"
              alt="로고"
              width="150px"
              height="25px"
            />
          </a>
          <CompanyButton className="company" onClick={showCompanyModal}>
            <img
              className="company"
              src="https://cdn-icons-png.flaticon.com/128/7500/7500171.png"
              width="30px"
              height="30px"
            />
            <span className="company">{companyName}</span>
          </CompanyButton>
          {companyModalOpen && (
            <CompanyModal
              setCompanyModalOpen={setCompanyModalOpen}
              company={company}
              companyName={companyName}
              setCompanyName={setCompanyName}
            />
          )}
        </Area>
        <Area>
          <AlarmContainer>
            <Button className="alarm" onClick={showAlarmModal}>
              {alarmList.some((item) => item.t_log_state === 0) ? (
                <NotificationImportantOutlinedIcon
                  className="alarm"
                  style={{ width: "28px", height: "28px", color: "#353535" }}
                />
              ) : (
                <NotificationsNoneSharpIcon
                  className="alarm"
                  style={{ width: "28px", height: "28px", color: "#353535" }}
                />
              )}
            </Button>
            {alarmModalOpen && (
              <AlarmModal
                setAlarmModalOpen={setAlarmModalOpen}
                alarmList={alarmList}
                fetchLogList={() => fetchLogList()}
                employeeNo={employeeNo}
                currentPage={currentPage}
                count={count}
                setCurrentPage={setCurrentPage}
                currentPosts={currentPosts}
              />
            )}
          </AlarmContainer>
          <GuideContainer>
            <Button className="guide" onClick={showGuideModal}>
              <HelpOutlineOutlinedIcon
                className="guide"
                style={{ width: "28px", height: "28px", color: "#353535" }}
              />
            </Button>
            {guideModalOpen && (
              <GuideModal setGuideModalOpen={setGuideModalOpen} />
            )}
          </GuideContainer>
          <Button onClick={() => toggleBot((prev) => !prev)}>
            <img src={ChatBotImg} alt="웹봇" width="40px" height="40px" />
          </Button>
          <ProfileButton className="profile" onClick={showUserModal}>
            <div>
              <span className="profile">{user.name}</span>
              <span className="profile">{selectedCompanyRank}</span>
            </div>
            <img
              className="profile"
              id="detail"
              src="https://cdn-icons-png.flaticon.com/128/748/748063.png"
              alt="상세보기"
              width="10px"
              height="10px"
            />
            <img
              className="profile"
              src={user.photo}
              alt="프로필 사진"
              width="35px"
              height="35px"
            />
          </ProfileButton>
          {userModalOpen && (
            <UserModal
              setUserModalOpen={setUserModalOpen}
              user={user}
              company={company}
              companyName={companyName}
              selectedCompanyRank={selectedCompanyRank}
            />
          )}
        </Area>
      </Wrapper>
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
    </>
  );
}

export default Header;
