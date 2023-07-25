import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";

const ModalWrapper = styled.div`
    /* 모달창 크기 */
    width: 300px;
    height: 300px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동 */
    position: absolute;
    top: 75px;
    right: 5%;

    /* 모달창 디자인 */
    background: linear-gradient(#800080, #EEEEEE, #EEEEEE, #EEEEEE);
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
        border-color: #AAAAAA transparent transparent transparent;
        transform: rotate(180deg);
        transform-origin: center top;
    }
`;

const ProfileWrapper = styled.div`
    margin: 30px 30px 15px 30px;
    padding: 10px;
    border-bottom: 1px solid #dddddd;

    .user {
        display: flex;
        justify-content: center;
        margin: 5px;
    }

    .user span {
        margin: 5px 3px;
        font-size: 17px;
    }

    .email {
        margin-top: 15px;
    }

    .email, .group {
        display: flex;
        align-items: center;
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        border: none;
        cursor: pointer;
        font-size: 14px;
    }

    .email img, .group img {
        border-radius: 100%;
    }

    .email:hover img, .group:hover img {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .email span, .group span {
        margin-left: 5px;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > a, & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: black;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0);
        border: none;
        font-size: 12px;
    }

    & > a > img, & > button > img {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        margin-right: 5px;
    }

    & > a:hover img, & > button:hover img {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

function UserModal(props) {
    const {setUserModalOpen, user, company, companyName} = props;
    const userModalRef = useRef(null);
    const selectedCompany = company.find((item) => item.t_company_name === companyName);

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        window.location.replace('/login');
    }
    
    useEffect(() => {
        const handler = (event) => {
            if (userModalRef.current && !userModalRef.current.contains(event.target)) {
                if(event.target.classList.contains("profile")) {
                    setUserModalOpen(true);
                } else {
                    setUserModalOpen(false);
                }
            }
        };
        
        document.addEventListener('mousedown', handler);
        
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [setUserModalOpen]);

    return (
        <ModalWrapper ref={userModalRef}>
            <ProfileWrapper>
                <div className="user">
                    <img src="https://cdn-icons-png.flaticon.com/128/309/309492.png" alt="프로필 사진" width="70px" height="70px" />
                </div>
                <div className="user">
                    <span>{user.name}</span>
                    <span>{selectedCompany.t_employee_duty}</span>
                </div>
                <button className="email">
                    <img src="https://cdn-icons-png.flaticon.com/128/9554/9554729.png" alt="이메일" width="30px" height="30px" />
                    <span>{user.email}</span>
                </button>
                <button className="group">
                    <img src="https://cdn-icons-png.flaticon.com/128/5126/5126646.png" alt="회사" width="30px" height="30px" />
                    <span>{companyName}</span>
                </button>
            </ProfileWrapper>
            <ButtonWrapper>
                <a href="#">
                    <img src="https://cdn-icons-png.flaticon.com/128/126/126472.png" alt="개인설정" />
                    <span>개인설정</span>
                </a>
                <button onClick={logoutHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/128/8367/8367686.png" alt="로그아웃" />
                    <span>로그아웃</span>
                </button>
            </ButtonWrapper>
        </ModalWrapper>
    );
}

export default UserModal;