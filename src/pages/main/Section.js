import React from "react";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ServiceList from "./ServiceList";
import axiosApi from "../../AxiosApi";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import NoticeList from "./NoticeList";
import NoticeModal from "./NoticeModal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 150px;
`;

const ServiceWrapper = styled.div`
    width: 60%;
    height: 680px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    padding-left: 12.5px;
`;

const MyService = styled.h3`
    font-size: 22px;
    font-weight: bold;
    padding: 40px 40px;
`;


const SideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 700px;
    margin-left: 30px;
`;

const StyledCalendar = styled(Calendar)`
    width: 400px;
    height: 350px;
    
    background-color: white;
    border: none;
    border-radius: 10px;

    .react-calendar__navigation {
        background: #dddddd;
        border-radius: 10px 10px 0px 0px;
        height: 50px;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
    }
    .react-calendar__navigation__prev2-button:hover {
        border-radius: 10px 0px 0px 0px;
    }
    
    .react-calendar__navigation__next2-button:hover {
        border-radius: 0px 10px 0px 0px;
    }
`;

const Notice = styled.div`
    width: 400px;
    height: 300px;
    margin-top: 30px;
    background-color: white;
    border-radius: 10px;
`;

const NoticeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #dddddd;
    border-radius: 10px 10px 0px 0px;
    font-size: 15px;
    font-weight: bold;
`;

const NoticeBody = styled.div`
    height: 210px;
    color: gray;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & > div > img {
        margin-top: 30px;
        width: 150px;
        height: 125px;
    }
`;

const CompanyLabel = styled.span`
    color: blue;
    line-height: 10px;
    margin-left: 7px;

    &::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 11px;
        background-color: gray;
        margin-right: 7px;
    }
`;

const A = styled.a`
    color: black;
    text-decoration: none;
    font-size: 11px;
`;

function Section(props) {
    const {companyName, service} = props;
    const { companyNo } = useSelector((state) => state.loginUserData);
    const [loading, setLoading] = useState(true);
    const [notices, setNotices] = useState([]);
    const [noticeModalOpen, setNoticeModalOpen] = useState(false);

    useEffect(() => {
        if(companyNo !== '') {
            setLoading(true);
            axiosApi.get('/api/select/notice/limit5', {
                params: {
                   companyNo: companyNo,
                },
            }).then((res) => {
                setLoading(false);
                setNotices(res.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [companyName]);

    return(
        <Wrapper>
            {loading && (
            <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
                <div className="mt-3">유저 정보를 불러오는 중입니다.<br />잠시만 기다려주세요.</div>
            </div>)}
            <ServiceWrapper>
                <MyService>내 서비스</MyService>
                <ServiceList service={service} />
            </ServiceWrapper>
            <SideWrapper>
                <StyledCalendar 
                    calendarType="US"
                    formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})} />
                <Notice>
                    <NoticeHeader>
                        <div>
                            <span>공지사항</span>
                            <CompanyLabel>{companyName}</CompanyLabel>
                        </div>
                    </NoticeHeader>
                    <NoticeBody>
                        {!loading ? 
                            (notices.length === 0 ? 
                                <div>
                                    <img src="https://static.wehago.com/imgs/common/ico_nodata76.png"/>
                                    <span>작성된 공지사항이 없습니다.</span>
                                </div>  : <NoticeList notices={notices} setNoticeModalOpen={setNoticeModalOpen}/>) 
                            : ''
                        }
                    </NoticeBody>
                </Notice>
            </SideWrapper>
            {noticeModalOpen && <NoticeModal setNoticeModalOpen={setNoticeModalOpen}/>}
        </Wrapper>
    );
}

export default Section;