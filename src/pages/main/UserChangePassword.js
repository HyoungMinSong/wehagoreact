import React, { useState } from "react";
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
    height: 60px;
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
        height: 60px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    & > li {
        font-size: 13px;
        color: gray;
    }

    & > button {
        width: 150px;
        height: 45px;
        background-color: #1c90fb;
        color: white;
        border: none;
        margin: 30px 0px;
    }
`;

const Table = styled.table`
    width: 80%;
    border-top: 2px solid gray;
    border-bottom: 1px solid #dddddd;
    margin: 30px 150px;
`;

const Tr = styled.tr`

`;

const LeftTd = styled.td`
    width: 50%;
    font-size: 15px;
    padding: 7px 15px 7px 7px;
    text-align: right;
`;

const RightTd = styled.td`
    display: flex;
    align-items: center;
    padding: 7px 7px 7px 15px;
    font-size: 12px;

    & > input {
        width: 250px;
        height: 35px;
        border: 1px solid #dddddd;
        padding: 10px;
    }

    & > input:focus {
        outline: none;
    }
`;

function UserChangePassword() {
    const { user, service, company, companyName } = useSelector((state) => state.loginUserData);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordApproval, setNewPasswordApproval] = useState(false);
    const [newPasswordCheckError, setNewPasswordCheckError] = useState(false);
    const [newPasswordCheckApproval, setNewPasswordCheckApproval] = useState(false);
    const pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    
    const changepasswordSubmitHandler = (e) => {
        e.preventDefault();
        
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const newPasswordCheck = e.target.newPasswordCheck.value;
        
        if(!pwRegex.test(currentPassword)) {
            alert("현재 비밀번호 정규식 에러!");
            e.target.currentPassword.focus();
            return;
        }
        
        if(!pwRegex.test(newPassword)) {
            alert("새 비밀번호 정규식 에러!");
            e.target.currentPassword.focus();
            return;
        }
        
        if(currentPassword === newPassword) {
            alert("현재 비밀번호와 다른 비밀번호를 사용하세요.");
            e.target.newPassword.focus();
            return;
        }

        if(!pwRegex.test(newPasswordCheck)) {
            alert("새 비밀번호 확인 정규식 에러!");
            e.target.currentPassword.focus();
            return;
        }

        if(newPassword !== newPasswordCheck) {
            alert("새 비밀번호가 일치하지 않습니다.");
            e.target.newPasswordCheck.focus();
            return;
        }
    }

    const inputCurrentPasswordHandler = (e) => {
        const currentPassword = e.target.value;

        if(currentPassword === '') {
            e.target.style = "border: 1px solid #dddddd";
        } else {
            e.target.style = "border: 1px solid blue";
        }
    }
    
    const inputNewPasswordHandler = (e) => {
        const newPassword = e.target.value;
        const newPasswordCheck = document.getElementById("newPasswordCheck");

        if(newPassword === '') {
            e.target.style = "border: 1px solid #dddddd";
        } else if(!pwRegex.test(newPassword)) {
            e.target.style = "border: 1px solid red";
        } else {
            e.target.style = "border: 1px solid green";
            if(newPassword === newPasswordCheck.value) {
                e.target.style = "border: 1px solid blue";
                newPasswordCheck.style = "border: 1px solid blue";
            } else {
                e.target.style = "border: 1px solid yellow";
            }
        }
    }

    const inputNewPasswordCheckHandler = (e) => {
        const newPassword = document.getElementById("newPassword");
        const newPasswordCheck = e.target.value;
        
        if(newPasswordCheck === '') {
            e.target.style = "border: 1px solid #dddddd";
        } else if(!pwRegex.test(newPasswordCheck)) {
            e.target.style = "border: 1px solid red";
        } else {
            e.target.style = "border: 1px solid green";
            if(newPassword.value === newPasswordCheck) {
                e.target.style = "border: 1px solid blue";
                newPassword.style = "border: 1px solid blue";
            } else {
                e.target.style = "border: 1px solid yellow";
            }
        }
    }

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
            <form onSubmit={changepasswordSubmitHandler}>
                <ContentWrapper>
                    <Table>
                        <Tr style={{height:"30px"}}/>
                        <Tr>
                            <LeftTd><label>현재 비밀번호</label></LeftTd>
                            <RightTd>
                                <input type="password" id="currentPassword" name="currentPassword" placeholder="현재 비밀번호를 입력하세요." onChange={inputCurrentPasswordHandler} required/>
                            </RightTd>
                        </Tr>
                        <Tr>
                            <LeftTd><label>새 비밀번호</label></LeftTd>
                            <RightTd>
                                <input type="password" id="newPassword" name="newPassword" placeholder="새 비밀번호를 입력하세요." onChange={inputNewPasswordHandler} required/>
                                {newPasswordError ? <small style={{color:"red"}}>사용할 수 없는 비밀번호 유형입니다.</small> : ''}
                                {newPasswordApproval ? <small style={{color:"green"}}>안전하게 사용할 수 있는 비밀번호입니다.</small> : ''}
                            </RightTd>
                        </Tr>
                        <Tr>
                            <LeftTd><label>새 비밀번호 확인</label></LeftTd>
                            <RightTd>
                                <input type="password" id="newPasswordCheck" name="newPasswordCheck" placeholder="새 비밀번호를 한번 더 입력하세요." onChange={inputNewPasswordCheckHandler} required/>
                                {newPasswordCheckError ? <small style={{color:"red"}}>새 비밀번호와 일치하지 않습니다.</small> : ''}
                                {newPasswordCheckApproval ? <small style={{color:"green"}}>새 비밀번호와 일치합니다.</small> : ''}
                            </RightTd>
                        </Tr>
                        <Tr style={{height:"30px"}}/>
                    </Table>
                </ContentWrapper>
                <ContentWrapper>
                    <li>8~16자의 영문 대/소문자, 숫자, 특수기호 조합 사용할 수 있습니다.</li>
                    <li>생년월일, 전화번호 등 개인정보와 관련된 숫자, 연속된 숫자, 연속된 키보드배열과 같이 쉬운 비밀번호는 타인이 쉽게 알아낼 수 있으니 사용을 자제해 주세요.</li>
                    <li>이전에 사용했던 비밀번호나 타 사이트와 다른 비밀번호를 사용하고 비밀번호는 주기적으로 변경해주세요.</li>
                    <button type="submit">확인</button>
                </ContentWrapper>
            </form>
        </div>
    );
}

export default UserChangePassword;