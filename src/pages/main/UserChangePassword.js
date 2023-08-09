import React, { useState } from "react";
import Header from "./HeaderComponent/Header";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { setUser, setService, setCompany, setCompanyName } from '../../store'
import axiosApi from "../../AxiosApi";
import Swal from "sweetalert2";

const Navbar = styled.nav `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    background: #1c90fb;
    color: white;
    padding: 0px 32px;
    margin-bottom: 40px;

    & > a {
        text-decoration: none;
        color: white;
        font-size: 20px;
    }

    & > div > button, & > div > a > button {
        width: 125px;
        height: 48px;
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
    margin: 30px 35px;
    border-bottom: 1px solid #dddddd;

    & > h3 {
        font-size: 20px;
        font-weight: 500;
    }

    & > span {
        font-size: 13px;
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
    width: 95%;
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
    const [newPasswordCheckRegError, setNewPasswordCheckRegError] = useState(false);
    const pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    
    const changepasswordSubmitHandler = async (e) => {
        e.preventDefault();
        
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const newPasswordCheck = e.target.newPasswordCheck.value;
        
        if(currentPassword === newPassword) {
            Swal.fire({
                title: false,
                text: "새 비밀번호를 현재 비밀번호와 다르게 설정하세요.",
                icon: "warning",
                showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                // reverseButtons: true, // 버튼 순서 거꾸로
            });
            e.target.newPassword.focus();
            return;
        }
        
        if(!pwRegex.test(newPassword)) {
            Swal.fire({
                title: false,
                text: "새 비밀번호 입력란을 확인하세요.",
                icon: "warning",
                showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                // reverseButtons: true, // 버튼 순서 거꾸로
            });
            e.target.newPassword.focus();
            return;
        }
        
        if(!pwRegex.test(newPasswordCheck)) {
            Swal.fire({
                title: false,
                text: "새 비밀번호 확인 입력란을 확인하세요.",
                icon: "warning",
                showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                // reverseButtons: true, // 버튼 순서 거꾸로
            });
            e.target.newPasswordCheck.focus();
            return;
        }

        if(newPassword !== newPasswordCheck) {
            Swal.fire({
                title: false,
                text: "새 비밀번호와 일치하지 않습니다.",
                icon: "warning",
                showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                // reverseButtons: true, // 버튼 순서 거꾸로
            });
            e.target.newPasswordCheck.focus();
            return;
        }

        const formData = new FormData();

        formData.append("id", user.id);
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);

        Swal.fire({
            title: false,
            text: "이대로 비밀번호를 수정 하시겠습니까?",
            icon: "warning",
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
            cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
            confirmButtonText: "확인", // confirm 버튼 텍스트 지정
            cancelButtonText: "취소", // cancel 버튼 텍스트 지정
            // reverseButtons: true, // 버튼 순서 거꾸로
          }).then((result) => {
            if (result.isConfirmed) {
              // 만약 모달창에서 confirm 버튼을 눌렀다면
              axiosApi.post("/api/update/userPassword", formData, {
                headers: {
                    "Content-Type": "form-data",
                },
              }).then((response) => {
                if(response.data) {
                    Swal.fire({
                        title: false,
                        text: "비밀번호가 수정 되었습니다.",
                        icon: "success",
                        showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                        // reverseButtons: true, // 버튼 순서 거꾸로
                    }).then(() => {
                        window.location.reload();
                    })
                } else {
                    Swal.fire({
                        title: false,
                        text: "현재 비밀번호가 일치하지 않습니다.",
                        icon: "error",
                        showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                        // reverseButtons: true, // 버튼 순서 거꾸로
                    });
                    e.target.currentPassword.focus();
                }
            }).catch((error) => {
                if(error.response.status === 500) {
                    alert("로그인 시간이 만료되었습니다. 재로그인이 필요합니다.");
                    window.location.replace('/login');
                } else {
                    Swal.fire({
                        title: false,
                        text: "정보 수정에 실패 했습니다.",
                        icon: "error",
                        showCancelButton: false, // cancel버튼 숨기기. 기본은 원래 없음
                        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                        // reverseButtons: true, // 버튼 순서 거꾸로
                    });
                    return;
                }
            });
            }
        });
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
            setNewPasswordError(false);
            setNewPasswordApproval(false);
        } else if(!pwRegex.test(newPassword)) { // 정규식에 맞지 않다면
            e.target.style = "border: 1px solid red";
            setNewPasswordError(true);
            setNewPasswordApproval(false);
        } else { // 정규식에 맞으면
            e.target.style = "border: 1px solid green";
            setNewPasswordError(false);
            setNewPasswordApproval(true);
            if(!pwRegex.test(newPasswordCheck.value)) { // 새 비밀번호 확인의 정규식이 맞지 않으면
                if(newPasswordCheck.value !== '') {
                    newPasswordCheck.style = "border: 1px solid red";
                    setNewPasswordCheckError(false);
                    setNewPasswordCheckApproval(false);
                    setNewPasswordCheckRegError(true);
                }
            } else {
                if(newPassword === newPasswordCheck.value) { // 새 비밀번호 확인과 일치하면
                    newPasswordCheck.style = "border: 1px solid green";
                    setNewPasswordCheckError(false);
                    setNewPasswordCheckApproval(true);
                    setNewPasswordCheckRegError(false);
                } else {
                    newPasswordCheck.style = "border: 1px solid red";
                    setNewPasswordCheckError(true);
                    setNewPasswordCheckApproval(false);
                    setNewPasswordCheckRegError(false);
                }
            }
        }
    }

    const inputNewPasswordCheckHandler = (e) => {
        const newPassword = document.getElementById("newPassword").value;
        const newPasswordCheck = e.target.value;
        
        if(newPasswordCheck === '') {
            e.target.style = "border: 1px solid #dddddd";
            setNewPasswordCheckError(false);
            setNewPasswordCheckApproval(false);
            setNewPasswordCheckRegError(false);
        } else if(!pwRegex.test(newPasswordCheck)) {
            e.target.style = "border: 1px solid red";
            setNewPasswordCheckError(false);
            setNewPasswordCheckApproval(false);
            setNewPasswordCheckRegError(true);
        } else {
            if(newPassword !== newPasswordCheck) {
                e.target.style = "border: 1px solid red";
                setNewPasswordCheckError(true);
                setNewPasswordCheckApproval(false);
                setNewPasswordCheckRegError(false);
            } else {
                e.target.style = "border: 1px solid green";
                setNewPasswordCheckError(false);
                setNewPasswordCheckApproval(true);
                setNewPasswordCheckRegError(false);
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
                        <tbody>
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
                                    {newPasswordError ? <small style={{color:"red", marginLeft:"10px"}}>사용할 수 없는 비밀번호 유형입니다.</small> : ''}
                                    {newPasswordApproval ? <small style={{color:"green", marginLeft:"10px"}}>안전하게 사용할 수 있는 비밀번호입니다.</small> : ''}
                                </RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd><label>새 비밀번호 확인</label></LeftTd>
                                <RightTd>
                                    <input type="password" id="newPasswordCheck" name="newPasswordCheck" placeholder="새 비밀번호를 한번 더 입력하세요." onChange={inputNewPasswordCheckHandler} required/>
                                    {newPasswordCheckError ? <small style={{color:"red", marginLeft:"10px"}}>새 비밀번호와 일치하지 않습니다.</small> : ''}
                                    {newPasswordCheckApproval ? <small style={{color:"green", marginLeft:"10px"}}>새 비밀번호와 일치합니다.</small> : ''}
                                    {newPasswordCheckRegError ? <small style={{color:"red", marginLeft:"10px"}}>비밀번호 유형을 확인하세요.</small> : ''}
                                </RightTd>
                            </Tr>
                            <Tr style={{height:"30px"}}/>
                        </tbody>
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