import { fontSize } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ModalWrapper = styled.div`
    /* 모달창 크기 */
    width: 300px;
    height: 270px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동 */
    position: absolute;
    top: 55px;
    left: -185px;

    /* 모달창 디자인 */
    background: white;
    border: none;
    border-radius: 10px;

    &::before {
        content: "";
        position: absolute;
        top: 0%;
        left: 72%;
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
    align-items: center;
    padding-left: 20px; 
    height: 50px;
    background: #04668a;
    border-radius: 10px 10px 0px 0px;

    & > span {
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 220px;
    background: #eeeeee;
    border-radius: 0px 0px 10px 10px;

    & > div {
        display: flex;
        align-items: center;
        width: 260px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #aaaaaa;
        border-radius: 7px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
    }

    & > div > img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }

    & > .guide1 {
        color: #e03434;
    }

    & > .guide1:hover {
        border: 1px solid #e03434;
    }

    & > .guide2 {
        color: #0085FF;
    }

    & > .guide2:hover {
        border: 1px solid #0085FF;
    }

    & > .guide3 {
        color: #5F71CB;
    }

    & > .guide3:hover {
        border: 1px solid #5F71CB;
    }
`;

function GuideModal(props) {
    const {setGuideModalOpen} = props;
    const guideModalRef = useRef(null);
    
    useEffect(() => {
        const handler = (event) => {
            if (guideModalRef.current && !guideModalRef.current.contains(event.target)) {
                if(event.target.classList.contains("guide")) {
                    setGuideModalOpen(true);
                } else {
                    setGuideModalOpen(false);
                }
            }
        };
        
        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [setGuideModalOpen]);

    return (
        <ModalWrapper ref={guideModalRef}>
            <ModalHeader>
                <span>WEHAGO 이용가이드</span>
            </ModalHeader>
            <ModalBody>
                <div className="guide1">
                    <img src="https://cdn-icons-png.flaticon.com/128/3128/3128307.png" alt="동영상가이드"/>
                    <span>동영상가이드 바로가기</span>
                </div>
                <div className="guide2">
                    <img src="https://cdn-icons-png.flaticon.com/128/5300/5300707.png" alt="온라인 문의"/>
                    <span>온라인 문의하기</span>
                </div>
                <div className="guide3">
                    <img src="https://cdn-icons-png.flaticon.com/128/1424/1424850.png" alt="원격시연"/>
                    <span>원격시연 요청하기</span>
                </div>
            </ModalBody>
        </ModalWrapper>
    );
}

export default GuideModal;