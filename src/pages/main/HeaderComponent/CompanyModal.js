import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import CompanyList from "./CompanyList";

const ModalWrapper = styled.div`
    /* 모달창 크기 */
    width: 300px;
    height: auto;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 75px;
    left: 10%;

    /* 모달창 디자인 */
    background: linear-gradient(#800080, #DDDDDD, #DDDDDD);
    border: none;
    border-radius: 7px;

    &::before {
        content: "";
        position: absolute;
        top: 0%;
        left: 50%;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: #AAAAAA transparent transparent transparent;
        transform: rotate(180deg);
        transform-origin: center top;
    }
`;

const CurrentCompanyArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    border-radius: 7px 7px 0px 0px;
    background-color: rgba(0, 0, 0, 0.2);
    
    & > span {
        color: white;
    }
`;

const Badge = styled.span`
    background: #03b1fc;
    border-radius: 10px;
    padding: 5px;
    font-size: 12px;
    margin-right: 7px;
`;

function CompanyModal(props) {
    const {setCompanyModalOpen, company, companyName, setCompanyName} = props;
    const companyModalRef = useRef(null);
    
    useEffect(() => {
        const handler = (event) => {
            if (companyModalRef.current && !companyModalRef.current.contains(event.target)) {
                if(event.target.classList.contains("company")) {
                    setCompanyModalOpen(true);
                } else {
                    setCompanyModalOpen(false);
                }
            }
        };
        
        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [setCompanyModalOpen]);


    return (
        <ModalWrapper ref={companyModalRef}>
            <CurrentCompanyArea>
                <Badge>접속회사</Badge>
                <span>{companyName}</span>
            </CurrentCompanyArea>
            <CompanyList setCompanyModalOpen={setCompanyModalOpen} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
        </ModalWrapper>
    );
}

export default CompanyModal;