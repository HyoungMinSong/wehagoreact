import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Header from "./HeaderComponent/Header";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setService, setCompany, setCompanyName } from '../../store'
import axiosApi from "../../AxiosApi";
import { Link } from "react-router-dom";

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

const TableWrapper = styled.div`
    padding: 30px 100px;

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
    display: flex;
    padding: 15px;
    font-size: 13px;

    & > img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
    }

    & > input {
        width: 300px;
        border: 1px solid #dddddd;
        padding: 3px 3px 3px 5px;
    }
`;

const UploadBtn = styled.div`
    width: 50px;
    height: 25px;
    background: #fff;
    border: 1px solid #dddddd;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgb(77,77,77);
        color: #fff;
    }
`;

const DeleteBtn = styled.div`
    width: 50px;
    height: 25px;
    background: #fff;
    border: 1px solid #dddddd;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;

    &:hover {
        background: rgb(77,77,77);
        color: #fff;
    }
`;

function UserSetting(props) {
    const dispatch = useDispatch();
    const prefixImgUrl = "http://localhost:8080/images/";

    const { user, service, company, companyName } = useSelector((state) => state.loginUserData);
    const [editClick, setEditClick] = useState(false);
    const index = company.findIndex((element) => element.t_company_name === companyName);

    const imgInputRef = useRef(null);
    const profileImgRef = useRef(null);
    const userIdRef = useRef(null);

    useEffect(() => {
        // 렌더링 이후에 해당 요소들을 찾아서 변수 업데이트
        imgInputRef.current = document.getElementById("file");
        profileImgRef.current = document.getElementById("profileImg");
    }, []);

    // 이미지를 선택하면 실행되는 함수
    const uploadBtnHandler = (event) => {
        const file = event.target.files[0]; // 선택한 파일
        const reader = new FileReader(); // FileReader 객체 생성

        // FileReader 로드가 완료되면 실행되는 이벤트 리스너
        reader.onload = function () {
            const imageDataURL = reader.result; // 이미지의 데이터 URL
            profileImgRef.current.src = imageDataURL; // 이미지의 데이터 URL을 <img> 요소의 src 속성에 할당하여 이미지를 보여줌
        };

        // 이미지 파일을 읽어들임
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const deleteBtnHandler = (event) => {
        profileImgRef.current.src = user.photo; // 다시 원래 유저 프로필 이미지로
        imgInputRef.current.value = ''; // 파일 등록 초기화
    }

    const editBtnHandler = () => {
        if(editClick) {
            setEditClick(false);
        } else {
            setEditClick(true);
        }
    }   

    const editSubmitHandler = async (e) => {
        e.preventDefault();

        const file = imgInputRef.current.files[0]; // 선택한 파일 가져오기
        const formData = new FormData();
        
        formData.append("profileImage", file); // 새 파일이 있으면 formData에 추가
        formData.append("id", userIdRef.current.innerText); // 식별 할 유저 아이디
        formData.append("name", e.target.name.value); // 이름 추가
        formData.append("email", e.target.email.value); // 이메일 추가
        formData.append("phone", e.target.phone.value); // 전화번호 추가

        try {
            const response = await axiosApi.post("/api/update/change_image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                });

            if(response.status === 200) {
                alert('정보가 수정되었습니다!');
                const userInfo = 
                {
                    "id" : userIdRef.current.innerText,
                    "name" : e.target.name.value,
                    "email" : e.target.email.value,
                    "photo" : prefixImgUrl + response.data.photo_path,
                    "phone" : e.target.phone.value
                }
                dispatch(setUser(userInfo));
                window.location.reload(); // 새로고침
            } else {
                alert('정보 수정에 실패했습니다..');
            }
        } catch (error) {
            console.error("업로드 실패:", error);
            return;
        }
    }

    return(
        <div>
            <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Navbar>
                <Link to="/detailuserinfo">개인설정</Link>
                <div>
                    {editClick ? '' : <button onClick={editBtnHandler}>수정</button>}
                    <Link to="/changepassword"><button>비밀번호 변경</button></Link>
                </div>
            </Navbar>
            <HeadLine>
                <h3>개인정보관리</h3>
                <span>소중한 내 정보를 최신으로 관리하세요.</span>
            </HeadLine>
            <form onSubmit={editSubmitHandler}>
                <TableWrapper>
                    <span>기본 정보</span>
                    <InfoTable>
                        <tbody>
                            <Tr>
                                <LeftTd>프로필 사진</LeftTd>
                                <RightTd>
                                    <img src={user.photo} alt="프로필 사진" id="profileImg" ref={profileImgRef}/>
                                    {editClick ? 
                                        <div style={{height: "70px"}}>
                                            <ul>
                                                <li>프로필 사진을 등록해주세요.</li>
                                                <li>이미지 파일 최대 크기 2MB 미만</li>
                                                <div style={{display: "flex", marginTop: "5px"}}>
                                                    <div>
                                                        <label htmlFor="file">
                                                            <UploadBtn>등록</UploadBtn>
                                                        </label>
                                                        <input type="file" name="file" id="file" 
                                                            ref={imgInputRef} accept="image/jpeg, image/jpg, image/png" 
                                                            style={{display: "none"}} onChange={uploadBtnHandler} />
                                                    </div>
                                                    <DeleteBtn onClick={deleteBtnHandler}>삭제</DeleteBtn> 
                                                </div>
                                            </ul>
                                        </div>
                                        : ''}
                                </RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>이름</LeftTd>
                                <RightTd>{editClick ? <input type="text" name="name" required/> : user.name}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>아이디</LeftTd>
                                <RightTd ref={userIdRef}>{user.id}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>이메일주소</LeftTd>
                                <RightTd>{editClick ? <input type="email" name="email" required/> : user.email}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>휴대전화번호</LeftTd>
                                <RightTd>{editClick ? <input type="phone" name="phone" required/> : user.phone}</RightTd>
                            </Tr>
                        </tbody>
                    </InfoTable>
                </TableWrapper>
                <TableWrapper>
                    <span>직장 정보</span>
                    <InfoTable>
                        <tbody>
                            <Tr>
                                <LeftTd>소속</LeftTd>
                                <RightTd>{companyName}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>직급</LeftTd>
                                <RightTd>{company.length > 0 ? company[index].t_employee_position : ''}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>직책</LeftTd>
                                <RightTd>{company.length > 0 ? company[index].t_employee_duty : ''}</RightTd>
                            </Tr>
                            <Tr>
                                <LeftTd>직장 전화번호</LeftTd>
                                <RightTd>{company.length > 0 ? company[index].t_company_call_num : ''}</RightTd>
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
                        </tbody>
                    </InfoTable>
                </TableWrapper>
                {editClick ? 
                    <div style={{display:"flex", justifyContent:"center", marginBottom:"30px"}}>
                        <button onClick={editBtnHandler} style={{border:"1px solid #dddddd", width:"80px", height:"50px"}}>취소</button>
                        <button type="submit" style={{border:"1px solid #dddddd", width:"80px", height:"50px", background:"#1c90fb", color:"white", marginLeft:"10px"}}>저장</button>
                    </div>
                    :
                    ''
                }
            </form>
        </div>
    );
}

export default UserSetting;