import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { styled } from "styled-components";
import CompanyModal from "./CompanyModal";
import UserModal from "./UserModal";
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChatBotImg from "../1538298822.svg";
import Chatbot from "react-chatbot-kit";
import config from '../../signUp/config';
import MessageParser from '../../signUp/MessageParser';
import ActionProvider from '../../signUp/ActionProvider';
import "../../signUp/chat.css";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;      
    background-color: white;
    position: sticky;
    top: 0;
    z-index:10;
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

function Header(props) {
    const [showBot, toggleBot] = useState(false);
    const {user, company, companyName, setCompanyName} = props;
    const [companyModalOpen, setCompanyModalOpen] = useState(false);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const selectedCompanyRank = company.find((item) => item.t_company_name === companyName) ? 
                                company.find((item) => item.t_company_name === companyName).t_employee_position : '직급없음';

    const showCompanyModal = () => {
        setCompanyModalOpen(preState => !preState);
    }

    const showUserModal = () => {
        setUserModalOpen(preState => !preState);
    }

    return(
        <>
        <Wrapper>
            <Area>
                <a href="/main">
                    <img src="https://static.wehago.com/imgs/common/wehago_b.svg" alt="로고" width="150px" height="25px"/>
                </a>
                <CompanyButton className="company" onClick={showCompanyModal}>
                    <img className="company" src="https://cdn-icons-png.flaticon.com/128/7500/7500171.png" width="30px" height="30px"/>
                    <span className="company">{companyName}</span>
                </CompanyButton>
                {companyModalOpen && <CompanyModal setCompanyModalOpen={setCompanyModalOpen} company={company} companyName={companyName} setCompanyName={setCompanyName} />}
            </Area>
            <Area>
                <Button>
                <NotificationsNoneSharpIcon style={{width: '28px', height: '28px', color: '#353535'}}/>
                </Button>
                <Button>
                <HelpOutlineOutlinedIcon style={{width: '28px', height: '28px', color: '#353535' }}/>
                </Button>
                <Button onClick={() => toggleBot((prev) => !prev)}>
                <img src={ChatBotImg} alt="웹봇" width="40px" height="40px" />
                </Button>
                <ProfileButton className="profile" onClick={showUserModal}>
                    <div>
                        <span className="profile">{user.name}</span>
                        <span className="profile">{selectedCompanyRank}</span>
                    </div>
                    <img className="profile" id="detail" src="https://cdn-icons-png.flaticon.com/128/748/748063.png" alt="상세보기" width="10px" height="10px" />
                    <img className="profile" src={user.photo} alt="프로필 사진" width="35px" height="35px" />
                </ProfileButton>
                {userModalOpen && <UserModal setUserModalOpen={setUserModalOpen} user={user} company={company} companyName={companyName} selectedCompanyRank={selectedCompanyRank} />}
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