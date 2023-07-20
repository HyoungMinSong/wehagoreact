import React from "react";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ServiceList from "./ServiceList";

const Wrapper = styled.div`
    width: 1400px;
    height: 700px;
    display: flex;
    padding: 100px 0px 0px 120px;
`;

const ServiceWrapper = styled.div`
    width: 790px;
    height: 600px;
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
    height: 630px;
`;

const StyledCalendar = styled(Calendar)`
    width: 350px;
    height: 350px;
    margin-left: 30px;
    background-color: white;
    border: none;
    border-radius: 10px;

    .react-calendar__navigation {
        background: #eeeeee;
        border-radius: 10px 10px 0px 0px;
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
    width: 350px;
    height: 250px;
    margin: 30px;
    background-color: white;
    border-radius: 10px;
`;

const NoticeHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #eeeeee;
    border-radius: 10px 10px 0px 0px;
    font-size: 14px;
    font-weight: bold;
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
        background-color: #dddddd;
        margin-right: 7px;
    }
`;

const A = styled.a`
    color: black;
    text-decoration: none;
    font-size: 11px;
`;

function Section(props) {
    const {service} = props;

    return(
        <Wrapper>
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
                            <CompanyLabel>더존비즈온</CompanyLabel>
                        </div>
                        <A href="#">더보기 &gt;</A>
                    </NoticeHeader>
                </Notice>
            </SideWrapper>
        </Wrapper>
    );
}

export default Section;