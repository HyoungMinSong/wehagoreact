import { fontSize } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ModalWrapper = styled.div`
    /* 모달창 크기 */
    width: 320px;
    height: 310px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동 */
    position: absolute;
    top: 75px;
    right: 1%;

    /* 모달창 디자인 */
    background: linear-gradient(#9370DB 30%, #EEEEEE 30%, #EEEEEE 100%);
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
        border-color: #9370DB transparent transparent transparent;
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
        align-items: center;
        margin: 5px;
    }

    .user img {
        border-radius: 100%;
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

    .group .a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > .a, & > button {
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

    & > .a > img, & > button > img {
        width: 25px;
        height: 25px;
        border-radius: 100%;
        margin-right: 5px;
    }

    & > .a:hover img, & > button:hover img {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

function UserModal(props) {
    const {setUserModalOpen, user, company, companyName, selectedCompanyRank} = props;
    const userModalRef = useRef(null);

    // 로그아웃 버튼 눌렀을 때
    const logoutHandler = () => {
        document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`; // 쿠키에 있는 Access Token 지우기
        localStorage.removeItem("persist:root");
        window.location.replace('/login'); // 로그인 창으로 가기
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
                    <img src={user.photo} alt="프로필 사진" width="70px" height="70px" />
                </div>
                <div className="user">
                    <span>
                        {(company.find((item) => item.t_company_name == companyName).t_employee_auth == 0 || 
                            company.find((item) => item.t_company_name == companyName).t_employee_auth == 1) ? 
                                <img src="https://cdn-icons-png.flaticon.com/128/5985/5985874.png" width="25px" height="30px"/> : ''}
                    </span>
                    <span>{user.name}</span>
                    <span>{selectedCompanyRank}</span>
                </div>
                <button className="email">
                    <img src="https://cdn-icons-png.flaticon.com/128/9554/9554729.png" alt="이메일" width="30px" height="30px" />
                    <span>{user.email}</span>
                </button>
                <button className="group">
                <Link className="a" to={'/organization/management'}>
                    <img src="https://cdn-icons-png.flaticon.com/128/5126/5126646.png" alt="회사" width="30px" height="30px" />
                    <span>
                        {companyName}
                        {
                            company.find((item) => item.t_company_name === companyName).t_employee_auth == 0
                            ? <label style={{background:"#d6c82b", borderRadius:"7px", color:"white", fontSize:"12px", marginLeft:"7px", padding:"3px"}}>마스터</label>
                            : company.find((item) => item.t_company_name === companyName).t_employee_auth == 1
                                ? <label style={{background:"#8f8f8c", borderRadius:"7px", color:"white", fontSize:"12px", marginLeft:"7px", padding:"3px"}}>관리자</label> : <label style={{background:"brown", borderRadius:"7px", color:"white", fontSize:"12px", marginLeft:"7px", padding:"3px"}}>일반</label>
                        }
                    </span>
                </Link>
                </button>
            </ProfileWrapper>
            <ButtonWrapper>
                <Link className="a" to={'/detailuserinfo'}>
                    <img src="https://cdn-icons-png.flaticon.com/128/126/126472.png" alt="개인설정" />
                    <span>개인설정</span>
                </Link>
                <button onClick={logoutHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/128/8367/8367686.png" alt="로그아웃" />
                    <span>로그아웃</span>
                </button>
            </ButtonWrapper>
        </ModalWrapper>
    );
}

export default UserModal;