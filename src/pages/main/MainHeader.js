import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import CompanyModal from "./HeaderComponent/CompanyModal";
import UserModal from "./HeaderComponent/UserModal";
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ChatBotImg from "./chatbotimg.svg";
import Chatbot from "react-chatbot-kit";
import config from '../signUp/config';
import MessageParser from '../signUp/MessageParser';
import ActionProvider from '../signUp/ActionProvider';
import "../signUp/chat.css";
import AlarmModal from "./HeaderComponent/AlarmModal";
import GuideModal from "./HeaderComponent/GuideModal";


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;      
    background-color: rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 0;
    z-index:10;
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
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 20px;
    cursor: pointer;

    & > span {
        color: white;
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
        color: white;
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

function MainHeader(props) {
    const [showBot, toggleBot] = useState(false);
    const {user, company, companyName, setCompanyName} = props;
    const [companyModalOpen, setCompanyModalOpen] = useState(false);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [alarmModalOpen, setAlarmModalOpen] = useState(false);
    const [guideModalOpen, setGuideModalOpen] = useState(false);
    const selectedCompanyRank = company.find((item) => item.t_company_name === companyName) ? 
                                company.find((item) => item.t_company_name === companyName).t_employee_position : '';

    const showCompanyModal = () => {
        setCompanyModalOpen(preState => !preState);
    }

    const showUserModal = () => {
        setUserModalOpen(preState => !preState);
    }

    const showAlarmModal = () => {
        setAlarmModalOpen(preState => !preState);
    }

    const showGuideModal = () => {
        setGuideModalOpen(preState => !preState);
    }

    return(
        <>
        <Wrapper>
            <Area>
                <a href="/main">
                    <img src="https://static.wehago.com/imgs/common/svg/wehago_w_all.svg" alt="로고" width="150px" height="25px"/>
                </a>
                <CompanyButton className="company" onClick={showCompanyModal}>
                    <img className="company" src="https://cdn-icons-png.flaticon.com/128/7500/7500171.png" width="30px" height="30px"/>
                    <span className="company">{companyName}</span>
                </CompanyButton>
                {companyModalOpen && <CompanyModal setCompanyModalOpen={setCompanyModalOpen} company={company} companyName={companyName} setCompanyName={setCompanyName} />}
            </Area>
            <Area>
                <AlarmContainer>
                    <Button className="alarm" onClick={showAlarmModal}>
                        <NotificationsNoneSharpIcon className="alarm" style={{ color: 'white',width: '28px', height: '28px', }}/>
                    </Button>
                    {alarmModalOpen && <AlarmModal setAlarmModalOpen={setAlarmModalOpen}/>}
                </AlarmContainer>
                <GuideContainer>
                    <Button className="guide" onClick={showGuideModal}>
                        <HelpOutlineOutlinedIcon className="guide" style={{ color: 'white',width: '28px', height: '28px', }}/>
                    </Button>
                    {guideModalOpen && <GuideModal setGuideModalOpen={setGuideModalOpen}/>}
                </GuideContainer>
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
        </>
    );
}

export default MainHeader;