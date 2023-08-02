import React from "react";
import Header from "./HeaderComponent/Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { setUser, setService, setCompany, setCompanyName } from '../../store'

const Navbar = styled.nav `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background: #1c90fb;
    color: white;
    padding: 0px 100px;
    margin-bottom: 40px;

    & > a {
        text-decoration: none;
        color: white;
        font-size: 22px;
    }

    & > div > button, & > div > a > button {
        width: 125px;
        height: 70px;
        background: none;
        border: none;
        color: white;
        font-size: 15px;
    }

    & > div > button:hover, & > div > a > button:hover {
        background: blue;
    }
`;

const HeadLine = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 100px;
    border-bottom: 1px solid #dddddd;

    & > span {
        font-size: 14px;
        margin-left: 15px;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
`;

const Table = styled.table`
    width: 80%;
    border-top: 2px solid gray;
    border-bottom: 1px solid #dddddd;
    margin: 50px 150px 30px 150px;
`;

const Tr = styled.tr`
    
`;

const LeftTd = styled.td`
    width: 50%;
    font-size: 15px;
    padding: 5px;
    text-align: right;
`;

const RightTd = styled.td`
    display: flex;
    padding: 5px;
    font-size: 15px;
`;

function UserChangePassword() {
    const { user, service, company, companyName } = useSelector((state) => state.loginUserData);

    return(
        <div>
            <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Navbar>
                <Link to="/detailuserinfo">개인설정</Link>
                <div>
                    <Link to="/changepassword"><button>비밀번호 변경</button></Link>
                </div>
            </Navbar>
            <HeadLine>
                <h3>비밀번호 변경</h3>
                <span>주기적인 비밀번호 변경을 통해 개인정보를 안전하게 보호하세요.</span>
            </HeadLine>
            <ContentWrapper>
                <Table>
                    <Tr>
                        <LeftTd><label>현재 비밀번호</label></LeftTd>
                        <RightTd><input /></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd><label>새 비밀번호</label></LeftTd>
                        <RightTd><input /></RightTd>
                    </Tr>
                    <Tr>
                        <LeftTd><label>새 비밀번호 확인</label></LeftTd>
                        <RightTd><input /></RightTd>
                    </Tr>
                </Table>
            </ContentWrapper>
        </div>
    );
}

export default UserChangePassword;