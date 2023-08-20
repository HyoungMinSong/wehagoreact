import { fontSize } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import AlarmModalItem from "./AlarmModalItem";
import { Button } from "react-bootstrap";
import axiosApi from "../../../AxiosApi";
import Paging from "../../commons/Paging";

const ModalWrapper = styled.div`
    /* 모달창 크기 */
    width: 300px;
    height: 250px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동 */
    position: absolute;
    top: 55px;
    left: -120px;

    /* 모달창 디자인 */
    background: white;
    border: none;
    border-radius: 10px;

    &::before {
        content: "";
        position: absolute;
        top: 0%;
        left: 50%;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: #04668a transparent transparent transparent;
        transform: rotate(180deg);
        transform-origin: center top;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px; 
    height: 50px;
    background: #04668a;
    border-radius: 9px 9px 0px 0px;

    & > span {
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px; 
    height: 250px;
    background: #eeeeee;
    border-radius: 0px 0px 10px 10px;

    & > img {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
    }

    & > small {
        color: gray;
    }
`;

const ListBody = styled.div`
    padding: 20px; 
    height: 250px;
    background: #eeeeee;

`;


function AlarmModal(props) {
    const {setAlarmModalOpen} = props;
    const alarmModalRef = useRef(null);
    
    useEffect(() => {
        const handler = (event) => {
            if (alarmModalRef.current && !alarmModalRef.current.contains(event.target)) {
                if(event.target.classList.contains("alarm")) {
                    setAlarmModalOpen(true);
                } else {
                    setAlarmModalOpen(false);
                    props.fetchLogList();
                }
            }
        };
        
        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [setAlarmModalOpen]);

    const handleDeleteLog = async () => {
        await axiosApi.put("/deleteLogByEmployee", parseInt(props.employeeNo));
        props.fetchLogList();
    };

    return (
        <ModalWrapper ref={alarmModalRef}>
            <ModalHeader>
                <span>알림</span>
                {props.alarmList && props.alarmList.length>0 && 
                <Button onClick={handleDeleteLog} style={{ marginRight: '10px'}}>전체 삭제</Button>
                }
            </ModalHeader>
            {props.alarmList && props.alarmList.length<1 ? (
                <ModalBody>
                        <img src="https://cdn-icons-png.flaticon.com/128/1321/1321678.png" alt="알림없음"/>
                        <small>새로운 알림이 없습니다.</small>
                </ModalBody>
            ) : (
                <ListBody>
                    <div style={{borderBottom: 'solid 1px'}}></div>
                    {props.currentPosts
                    .map((log) => {
                        return (
                            <AlarmModalItem log={log} key={log.t_log_no} />
                        );
                    }
            )}
            <Paging page={props.currentPage} count={props.count} setPage={props.setCurrentPage} />
                    </ListBody>
            )}
        </ModalWrapper>
    );
}

export default AlarmModal;