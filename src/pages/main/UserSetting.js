import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Header from "./HeaderComponent/Header";
import { useLocation } from "react-router";
import axiosApi from "../../AxiosApi";
import { Spinner } from "react-bootstrap";

const StyledHeader = styled.div`
    background-color: gray;
    width: 100%;
    color: black;
    
`;

const Navbar = styled.nav `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background: #1c90fb;
    color: white;
    padding: 0px 30px;
    margin-bottom: 40px;

    & > div > button {
        width: 125px;
        height: 50px;
        background: none;
        border: none;
        color: white;
    }

    & > div > button:hover {
        background: blue;
    }
`;

const HeadLine = styled.div`
    display: flex;
    align-items: center;
    margin: 30px;
    border-bottom: 1px solid #dddddd;

    & > span {
        font-size: 14px;
        margin-left: 15px;
    }
`;

const TableWrapper = styled.div`
    padding: 30px;

    & > span {
        font-weight: bold;
    }
`;

const InfoTable = styled.table`
    width: 100%;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    margin-top: 5px;
`;

const Tr = styled.tr`
    border-bottom: 1px solid #dddddd;
`;

const LeftTd = styled.td`
    border-right: 1px solid #dddddd;
    width: 175px;
    background: #eeeeee;
    font-size: 13px;
    text-align: right;
    padding: 15px;
`;

const RightTd = styled.td`
    padding: 15px;
    font-size: 13px;

    & > img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
    }
`;

function UserSetting(props) {
    const [user, setUser] = useState({});
    const [service, setService] = useState([]);
    const [company, setCompany] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // 쿠키에 있는 Access Token 가져오기
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
              };
            const accessToken = getCookie('accessToken');
          
            // Access Token이 있으면 헤더에 등록 시키기
            if (accessToken) {
              axiosApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            } else {
                alert('로그인 시간이 만료되어 재로그인이 필요합니다.');
                window.location.replace('/login');
            }

            try {
              // 요청 데이터 가져오기
              const response = await axiosApi.get('/api/data');
              
              if(response.status == 200) {
                setLoading(false);
                const userInfo = 
                {
                    "id" : response.data.userDto.t_user_id,
                    "name" : response.data.userDto.t_user_name,
                    "email" : response.data.userDto.t_user_email,
                    "photo" : response.data.userDto.t_user_photo_path,
                    "phone" : response.data.userDto.t_user_phone
                }
                const userCompany = response.data.userCompanyDtoList;
                const userService = response.data.userServiceDtoList;
                
                setUser(userInfo);
                setCompany(userCompany);
                setService(userService);
                setCompanyName(userCompany[0].t_company_name);
              } else {
                alert('로그인 시간이 만료되어 재로그인이 필요합니다.');
                window.location.replace('/login');
              }
            } catch (error) {
              console.error(error);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
            {loading && (
            <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
                <div className="mt-3">유저 정보를 불러오는 중입니다.<br />잠시만 기다려주세요.</div>
            </div>)}
            <StyledHeader>
                <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            </StyledHeader>
            <div>
                
            </div>
            <Navbar>
                <h4>개인설정</h4>
                <div>
                    <button>수정</button>
                    <button>비밀번호 변경</button>
                </div>
            </Navbar>
            <HeadLine>
                <h3>개인정보관리</h3>
                <span>소중한 내 정보를 최신으로 관리하세요.</span>
            </HeadLine>
            <TableWrapper>
                <span>기본 정보</span>
                <InfoTable>
                    <Tr>
                        <LeftTd>프로필 사진</LeftTd>
                        <RightTd>
                            <img src={user.photo} alt="프로필 사진"/>
                        </RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>이름</LeftTd>
                        <RightTd>{user.name}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>아이디</LeftTd>
                        <RightTd>{user.id}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>이메일주소</LeftTd>
                        <RightTd>{user.email}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>휴대전화번호</LeftTd>
                        <RightTd>{user.phone}</RightTd>
                    </Tr>
                </InfoTable>
            </TableWrapper>
            <TableWrapper>
                <span>직장 정보</span>
                <InfoTable>
                    <Tr>
                        <LeftTd>소속</LeftTd>
                        <RightTd>{companyName}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>직급</LeftTd>
                        <RightTd>{company.length > 0 ? company[0].t_employee_position : ''}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>직책</LeftTd>
                        <RightTd>{company.length > 0 ? company[0].t_employee_duty : ''}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>직장 전화번호</LeftTd>
                        <RightTd>{company.length > 0 ? company[0].t_company_call_num : ''}</RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>내선번호</LeftTd>
                        <RightTd></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>직장 팩스번호</LeftTd>
                        <RightTd></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>직장 주소</LeftTd>
                        <RightTd></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>담당업무</LeftTd>
                        <RightTd></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>사원번호</LeftTd>
                        <RightTd></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd>입사일</LeftTd>
                        <RightTd>{company.length > 0 ? company[0].t_employee_date : ''}</RightTd>
                    </Tr>
                </InfoTable>
            </TableWrapper>
        </div>
    );
}

export default UserSetting;