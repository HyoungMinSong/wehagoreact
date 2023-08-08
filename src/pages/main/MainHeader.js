import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import CompanyModal from "./HeaderComponent/CompanyModal";
import UserModal from "./HeaderComponent/UserModal";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 70px;      
    background-color: rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 0;
    z-index:10;
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

function MainHeader(props) {
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
            <Area/><Area/>
            <Area>
                <Button>
                    <img src="https://cdn-icons-png.flaticon.com/128/8335/8335899.png" alt="알림" width="30px" height="30px"/>
                </Button>
                <Button>
                    <img src="https://cdn-icons-png.flaticon.com/128/4291/4291393.png" alt="포인트" width="30px" height="30px"/>
                </Button>
                <Button>
                    <img src="https://cdn-icons-png.flaticon.com/128/8803/8803906.png" alt="이용가이드" width="30px" height="30px"/>
                </Button>
                <Button>
                    <img src="https://cdn-icons-png.flaticon.com/128/2068/2068998.png" alt="웹봇" width="30px" height="30px"/>
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
    );
}

export default MainHeader;