import { styled, css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { beTheChosenOnes } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axiosApi from "../../../AxiosApi";

const WrappingGridBox = styled.div.attrs(({ $isexpanded }) => ({
  // isexpanded prop를 DOM 요소로 전달합니다.
  isexpanded: $isexpanded,
}))`
  height: 100%;
  .unrealGridBox {
    height: 100%;
    background-color: gray;
  }
  .unrealGridBoxText {
    line-height: 50vh;
    color: white;
    font-weight: bold;
  }
  .realMovingTable {
    height: calc(100% - 2px);
    border-width: 2px 1px 1px;
    border-style: solid;
    border-color: rgb(0, 0, 0) rgb(225, 225, 225) rgb(225, 225, 225);
    position: relative;
    display: block;
    height: 100%;
    width: ${(props) => (props.isexpanded == "true" ? "50%" : "100%")};
    transition: width 0.5s;
  }
  .unrealTable {
    display: none;
  }
  .WrappingTable {
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgb(255, 255, 255);
    border-style: none;
    border-width: 0px;
    cursor: default;
    width: 100%;
    height: 100%;
  }
  .movingTable {
    height: 100%;
    overflow: auto;
    // display: flex;
    word-break: break-all;
    white-space: nowrap;
  }
  tr,
  td,
  th {
    border-style: solid;
    border-width: 1px;
    height: 30px;
    font-size: 13px;
    word-break: break-all;
  }
  tr {
    max-height: 30px;
  }
  th {
    background-color: #efeffb;
    width: 150px;
  }
  caption {
    border-top: black;
    border-top-width: 1px;
    border-top-style: solid;
  }
  table {
    width: 100%;
  }
  .user-detail {
    height: 100%;
    border: 1px solid #ccc;
    overflow: auto;
    position: absolute;
    top: 0;
    right: 0;
    margin-left: 10px;
    background: #fff;
    width: ${(props) => (props.isexpanded == "true" ? "50%" : "0%")};
    transition: width 0.5s;
  }
  #theChosenOnes {
    checked: false;
  }
  select{
    width:200px;
    height: 25px;
  }
  input[type=text]{
    width:200px;
    height: 25px;
  }
  input[type=radio]{
    height: 15px;
    width: 15px;
    margin-right: 5px;
    margin-left: 5px;
    vertical-align: text-bottom;
  }
`;

const WrappingDetailBox = styled.div`
  height:700px;
  .detailBoxTit {
    margin: 5px 10px 0px;
    position: relative;
    min-height: 22px;
    padding: 5px 0;
  }
  h2 {
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
  }
  .detailBoxButtonBox {
    position: absolute;
    top: 2px;
    right: 0;
  }
  .detailBoxBB {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border: 1px solid rgb(211, 211, 211);
    background: rgb(255, 255, 255);
    color: rgb(74, 74, 74);
    text-decoration: none;
    font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
    font-size: 12px;
    height: 27px;
    letter-spacing: -0.5px;
    line-height: initial;
    padding: 1px 10px 0px;
    width: auto;
    margin-left: 4px;
  }
  .detailBoxBX {
    margin-left: 4px;
    width: 27px;
    height: 27px;
    padding: 0;
    display: inline-block;
    position: relative;
    border: 0;
    background: 0 0;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
  }
  .detailBoxInBox {
    padding: 10px 0 0 10px;
    position: relative;
  }
  .detailBoxStaffInfo {
    text-align: left;
    position: relative;
    padding: 22px;
    background: #12a4f7;
  }
  .detailBoxStaffFace {
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 20px;
    width: 65px;
    height: 65px;
    margin-top: -32px;
    border-radius: 65px;
  }
  .hiddingInput {
    display: none;
  }
  .detailBoxStaffPhoto {
    border-radius: 65px;
    width: 100%;
    border: 0;
    vertical-align: top;
  }
  .detailBoxStaffBt {
    margin-left: 80px;
  }
  .detailBoxProfInfo {
    text-align: left;
    margin-left: 100px;
    font-size: 18px;
    color: #fff;
  }
  .detailBoxProfId {
    display: inline-block;
    margin: 2px 0 0 10px;
    padding-left: 7px;
    border-left: 1px solid #89d2fb;
    font-size: 13px;
    color: #b5daff;
    vertical-align: top;
  }
  .detailBoxProfButton {
    display: inline-block;
    margin-left: 100px;
  }
  .profPhotoInButton {
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    position: relative;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: none;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
    font-size: 13px;
    height: 27px;
    letter-spacing: -0.5px;
    line-height: initial;
    padding: 5px 15px;
    width: auto;
    margin-left: 7px;
    margin-top: 7px;
  }
  .profPhotoInInput {
    cursor: pointer;
    position: absolute;
    inset: 0px;
    width: 100%;
    opacity: 0;
    display: none;
  }
  .profPhotoOutButton {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: none;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
    font-size: 13px;
    height: 27px;
    letter-spacing: -0.5px;
    line-height: initial;
    padding: 5px 15px;
    width: auto;
    margin: 7px;
  }
  .profPhotoGuideText {
    margin-top: 8px;
    font-size: 12px;
    color: #d2e9ff;
    margin-left: 100px;
    margin-bottom: 0;
  }
  .profPhotoGuideText1 {
    font-size: 12px;
    color: #d2e9ff;
    margin-left: 100px;
    margin-bottom: 0;
  }
  .detailBoxFormButton {
    padding: 10px 0 20px;
    text-align: center;
  }
  .detailBoxFormCancelButton {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border: 1px solid rgb(211, 211, 211);
    background: rgb(255, 255, 255);
    color: rgb(74, 74, 74);
    text-decoration: none;
    font-size: 16px;
    font-family: "Nanum Square", "Malgun Gothic", Helvetica,
      "Apple SD Gothic Neo", sans-serif;
    height: 37px;
    line-height: initial;
    padding: 1px 20px 0px;
    width: auto;
    margin-top: 8px;
  }
  .detailBoxFormSaveButton {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border: 1px solid rgb(28, 144, 251);
    background: rgb(28, 144, 251);
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 16px;
    font-family: "Nanum Square", "Malgun Gothic", Helvetica,
      "Apple SD Gothic Neo", sans-serif;
    height: 37px;
    line-height: initial;
    padding: 1px 20px 0px;
    width: auto;
    margin-top: 8px;
    margin-left: 5px;
  }
  .detailBoxInputForm {
    width: auto;
    position: static;
    min-width: 140px;
    margin-top: 20px;
  }
  .detailBoxInputFormTit {
    position: relative;
    min-height: 22px;
    padding: 5px 0;
  }
  .detailBoxInputFormTit > h2 {
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
  }
  .detailBoxInputArea {
    width: 100%;
    border: 0;
    border-collapse: separate;
    border-top: 2px solid #646464;
    border-bottom: 1px solid #e5e5e5;
    table-layout: fixed;
    border-spacing: 0;
  }


`;

function BasicGridBox(props) {
  // 회사, 조직에 해당하는 유저들의 목록
  const [showingMyEmployees, setShowingMyEmployees] = useState([]);  
  // 이미지 등록 참조
  const fileInputRef = useRef(null);
  // 이미지 저장용
  const [selectedImage, setSelectedImage] = useState(null);

  // 유효성 검사: 배열인지 확인하여, 배열이 아니면 빈 배열로 초기화
  useEffect(() => {
    if (Array.isArray(props.showingMyEmployees)) {
      setShowingMyEmployees(props.showingMyEmployees);
    } else {
      setShowingMyEmployees([]);
    }
  }, [props.showingMyEmployees, props.isExpanded]);

  useEffect(() => {
    updateOnesDate(props.selectedDate);
  }, [props.selectedDate]);

  // 직원 행 클릭 이벤트
  const handleRowClick = (user) => {
    setSelectedImage(null);
    props.setOperateRegisMode(false);
    props.setSelectedUser(user);
    props.setUpdateSelectedUser(user);
    if (user.t_user_photo_path.startsWith('http')) {
      props.setShowMyThumbnail(user.t_user_photo_path);
    } else {
      props.setShowMyThumbnail(process.env.PUBLIC_URL + user.t_user_photo_path);
    }    
    console.log("dsdsd", props.updateSelectedUser);
    props.setIsExpanded("true");
    props.setSelectedDate(new Date(JSON.stringify(user.t_employee_date)));
  };

  // Detail X버튼 클릭 이벤트
  const handleXClick = () => {
    props.setUpdateSelectedUser([]);
    props.setIsExpanded("false");
  };

  // redux dispatch
  const dispatch = useDispatch();
  const dataOfTheChosenOnes = useSelector(
    (state) => state.areThereAnyChosenOnes
  );

  // 체크박스 이벤트
  const chosenOnes = (e, user) => {
    console.log(e.target.checked);
    console.log(user);
    if (e.target.checked) {
      const updateDataOfTheChosenOnes = [
        ...dataOfTheChosenOnes,
        { t_user_no: user.t_user_no },
      ];
      dispatch(beTheChosenOnes(updateDataOfTheChosenOnes));
    } else if (!e.target.checked) {
      const updateDataOfTheChosenOnes = [...dataOfTheChosenOnes];
      const chosenOnesIndex = dataOfTheChosenOnes.findIndex(
        (item) => item.t_user_no === user.t_user_no
      );
      updateDataOfTheChosenOnes.splice(chosenOnesIndex, 1);
      dispatch(beTheChosenOnes(updateDataOfTheChosenOnes));
    }
  };

  // 개인정보 수정 이벤트
  const updateOnes = (e) => {
    const editedUpdateSelectedUser = { ...props.updateSelectedUser };
    if (e.target.name === "su-usname") {
      editedUpdateSelectedUser.t_user_name = e.target.value;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
    if (e.target.name === "su-orname") {
      editedUpdateSelectedUser.t_organization_name = e.target.value;
      editedUpdateSelectedUser.t_organization_no = e.target.options[e.target.selectedIndex].dataset.label;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
    if (e.target.name === "su-emposi") {
      editedUpdateSelectedUser.t_employee_position = e.target.value;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
    if (e.target.name === "su-emduty") {
      editedUpdateSelectedUser.t_employee_duty = e.target.value;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
    if (e.target.name === "su-usphon") {
      editedUpdateSelectedUser.t_user_phone = e.target.value;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
    if (e.target.name === "su-usemai") {
      editedUpdateSelectedUser.t_user_email = e.target.value;
      props.setUpdateSelectedUser(editedUpdateSelectedUser);
    }
  };

  // 권한 선택 이벤트
  const handleUserRoleChange = (event) => {
    if(event.target.value === "관리자"){
      props.setUpdateSelectedUser({
        ...props.updateSelectedUser,
        t_employee_auth: 1,
      });
    }else if(event.target.value === "일반"){
      props.setUpdateSelectedUser({
        ...props.updateSelectedUser,
        t_employee_auth: 2,
      });
    }
  };

  // 개인정보 날짜 수정 이벤트
  const updateOnesDate  = (e) => {
    const editedUpdateSelectedUser = { ...props.updateSelectedUser };
    editedUpdateSelectedUser.t_employee_date = `${e.getFullYear()}-${("0" + (e.getMonth() + 1)).slice(-2)}-${("0" + e.getDate()).slice(-2)}`;
    // e.toLocaleDateString().slice(0, -1).replace(/. /gi, "-");
    props.setUpdateSelectedUser(editedUpdateSelectedUser);
  };

  // 사진등록 버튼 이벤트
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 사진삭제 버튼 이벤트
  const handleFileResetClick = () => {
    setSelectedImage(null);
    props.setUpdateSelectedUser({
      ...props.updateSelectedUser,
      t_user_photo_name: '기본사진',
      t_user_photo_path: 'https://static.wehago.com/imgs/dummy/@dummy_02.jpg',
    });
    props.setShowMyThumbnail('https://static.wehago.com/imgs/dummy/@dummy_02.jpg');
  };

  // 파일 변경 이벤트
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    console.log("파일",selectedFile);

    // 파일을 선택한 후에 처리할 작업을 수행합니다.
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileDataUrl = reader.result;
        props.setShowMyThumbnail(fileDataUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 저장버튼 이벤트 등록
const handleSaveClick = async () => {
  try {
    console.log("props.updateSelectedUser", props.updateSelectedUser);
    console.log("props.updateSelectedUser date", typeof(props.updateSelectedUser.t_employee_date),props.updateSelectedUser.t_employee_date);
    // 이미지 파일 저장
    let uploadedImageName = '기본사진';
    let uploadedImagePath = 'https://static.wehago.com/imgs/dummy/@dummy_02.jpg';
    // 이미지 파일 저장
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      try {
        const response = await axiosApi.post("/uploadEmployeePhoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("업로드 완료:", response);
        console.log("업로드 완료:", response.data);
        
        uploadedImageName = response.data.photo_name;
        uploadedImagePath = response.data.photo_path;
        
      } catch (error) {
        console.error("업로드 실패:", error);
        return; // 이미지 업로드 실패 시 함수 종료
      }
    } 
    
    // 이미지 업로드가 성공적으로 처리되었으므로 두 번째 요청 수행
    try {
      const updatedUser = {
        ...props.updateSelectedUser,
        t_user_photo_name: uploadedImageName,
        t_user_photo_path: uploadedImagePath,
      };
      await axiosApi.post("/makeRoomForANewEmployee", updatedUser);
      await props.fetchData();
      props.setIsExpanded("false");
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};


  // 저장버튼 이벤트 수정
  const handleUpdateClick = () => {
    console.log("props.updateSelectedUser", props.updateSelectedUser);
  };

  return (
    <WrappingGridBox $isexpanded={props.isExpanded}>
      <div className="realMovingTable">
        <div className="WrappingTable">
          <div
            className={`unrealGridBox ${
              props.editingOrganization ? "" : "unrealTable"
            }`}
          >
            <span className="unrealGridBoxText">
              조직도 수정 시 직원리스트 조회가 불가합니다.
            </span>
          </div>
          <div
            className={`movingTable ${
              props.editingOrganization ? "unrealTable" : ""
            }`}
          >
            <table>
              <thead>
                <tr>
                  {props.selectedListTab === 0 && <th>V</th>}
                  {props.selectedListTab === 1 && <th>V</th>}
                  <th>이름</th>
                  <th>소속</th>
                  <th>직급</th>
                  <th>이메일주소</th>
                  <th>휴대전화번호</th>
                  <th>입사일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {showingMyEmployees.map((user) => (
                  <tr
                    key={user.t_user_no}
                    onClick={() => handleRowClick(user)}
                    className={props.selectedUser === user ? "selected" : ""}
                  >
                    {props.selectedListTab === 0 && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          name="theChosenOnes"
                          onChange={(e) => chosenOnes(e, user)}
                        />
                      </td>
                    )}
                    {props.selectedListTab === 1 && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          name="theChosenOnes"
                          onChange={(e) => chosenOnes(e, user)}
                        />
                      </td>
                    )}
                    <td>{user.t_user_name}</td>
                    <td>{user.t_organization_name}</td>
                    <td>{user.t_employee_position}</td>
                    <td>{user.t_user_email}</td>
                    <td>{user.t_user_phone}</td>
                    <td>{user.t_employee_date}</td>
                    <td>
                      {user.t_employee_state === 0 && "미가입"}
                      {user.t_employee_state === 1 && "가입대기"}
                      {user.t_employee_state === 2 && "사용중"}
                      {user.t_employee_state === 3 && "사용중지"}
                      {user.t_employee_state === -1 && "퇴사"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <div className="user-detail">
          <WrappingDetailBox>
            <div className="detailBoxTit">
              <h2>직원정보</h2>
              <div className="detailBoxButtonBox">
                {(props.operateRegisMode || props.updateSelectedUser.t_employee_auth ===0) ? (
                  ""
                ) : (
                  <button type="button" className="detailBoxBB">
                    사용중지
                  </button>
                )}
                {(props.operateRegisMode || props.updateSelectedUser.t_employee_auth ===0 ) ? (
                  ""
                ) : (
                  <button type="button" className="detailBoxBB">
                    퇴사
                  </button>
                )}
                <button
                  type="button"
                  className="detailBoxBX"
                  onClick={handleXClick}
                >
                  Ｘ
                </button>
              </div>
            </div>
            <div className="detailBoxInBox">
              <div className="detailBoxStaffInfo">
                <div className="detailBoxStaffFace">
                  <div>
                    <input type="file" className="hiddingInput" />
                  </div>
                  <img
                    src={props.showMyThumbnail}
                    alt="Image"
                    className="detailBoxStaffPhoto"
                  />
                </div>
                <div className="detailBoxProfBt">
                  <div className="detailBoxProfInfo">
                    {props.operateRegisMode ? "" : props.updateSelectedUser.t_user_name}
                    <span className="detailBoxProfId">
                      {props.operateRegisMode ? "" : props.updateSelectedUser.t_user_id}
                    </span>
                  </div>
                  <div>
                    <div className="detailBoxProfButton">
                      <button
                        type="button"
                        id="fileupload"
                        className="profPhotoInButton"
                        onClick={handleButtonClick}
                      >
                        등록
                      </button>
                      <input 
                        type="file" 
                        className="profPhotoInInput" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="profPhotoOutButton"
                      onClick={handleFileResetClick}
                    >
                      삭제
                    </button>
                    <p className="profPhotoGuideText">
                      프로필 사진을 등록 또는 삭제한 후 저장 버튼을
                      클릭해주세요.
                    </p>
                    <p className="profPhotoGuideText1">
                      이미지 최대사이즈 50*50px, 용량 500KB 미만
                    </p>
                  </div>
                </div>
              </div>
              <div className="detailBoxInputForm">
                <div className="detailBoxInputTit">
                  <h2>기본정보</h2>
                </div>
                <table className="detailBoxInputArea">
                  <caption></caption>
                  <colgroup>
                    <col></col>
                  </colgroup>
                  <tbody>
                    {props.operateRegisMode ? (
                      <tr>
                      <th>이름</th>
                      <td>
                        <input
                          type="text"
                          name="su-usname"
                          value={props.updateSelectedUser.t_user_name || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      </td>
                    </tr>
                    ) : (
                      ""
                    )}
                    <tr>
                      <th>소속</th>
                      <td>
                        {props.myCompanyInfo.map(
                          (companyName, companyIndex) => {
                            const departments = props.myWorkPlace.filter(
                              (company) =>
                                company.t_company_no ===
                                companyName.t_company_no
                            );
                            return (
                              <select
                                name="su-orname"
                                key={companyIndex}
                                onChange={(e) => updateOnes(e)}
                                value={
                                  props.updateSelectedUser
                                    .t_organization_name || ""
                                }
                              >
                                <option
                                  key={companyName.t_organization_no}
                                  value={companyName.t_company_name}
                                  data-label="-1"
                                >
                                  {companyName.t_company_name}
                                </option>
                                {departments.map(
                                  (department) => {
                                    if (department.t_organization_no === null) {
                                      return null; // null을 반환하여 해당 div를 출력하지 않음
                                    }
                                    return (
                                      <option
                                        key={department.t_organization_no}
                                        value={department.t_organization_name}
                                        data-label={department.t_organization_no}
                                      >
                                        {department.t_organization_name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            );
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>직급</th>
                      <td>
                        <input
                          type="text"
                          name="su-emposi"
                          placeholder="인턴 사원 주임 대리 과장 부장"
                          value={
                            props.updateSelectedUser.t_employee_position || ""
                          }
                          onChange={(e) => updateOnes(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>직책</th>
                      <td>
                        <input
                          type="text"
                          name="su-emduty"
                          placeholder="팀원 팀장 실장 파트장 센터장"
                          value={props.updateSelectedUser.t_employee_duty || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>유선전화번호</th>
                      <td>
                        <input
                          type="text"
                          name="su-usphon"
                          value={props.updateSelectedUser.t_user_phone || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>입사일</th>
                      <td>
                      <DatePicker
                        dateFormat='yyyy-MM-dd'
                        shouldCloseOnSelect
                        selected={props.selectedDate}
                        defaultValue
                        onChange={(date) => props.setSelectedDate(date)}
                      />
                      </td>
                    </tr>
                    <tr>
                      <th>이메일주소</th>
                      <td>
                        <input
                          type="text"
                          name="su-usemai"
                          value={props.updateSelectedUser.t_user_email || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      </td>
                    </tr>
                    {props.operateRegisMode ? (
                      ""
                    ) : (
                      <tr>
                        <th>상태</th>
                        <td>
                          {props.updateSelectedUser.t_employee_state === 0 &&
                            "미가입"}
                          {props.updateSelectedUser.t_employee_state === 1 &&
                            "가입대기"}
                          {props.updateSelectedUser.t_employee_state === 2 &&
                            "사용중"}
                          {props.updateSelectedUser.t_employee_state === 3 &&
                            "사용중지"}
                          {props.updateSelectedUser.t_employee_state === -1 &&
                            "퇴사"}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <th>관리자 권한</th>
                    {props.updateSelectedUser.t_employee_auth ===0 ? (
                      <td>
                        <label><input
                            type="radio"
                            value="0"
                            checked
                          />마스터</label>
                      </td>
                    ) : (
                      <td>
                        <label>
                          <input
                            type="radio"
                            value="관리자"
                            checked={props.updateSelectedUser.t_employee_auth === 1}
                            onChange={handleUserRoleChange}
                          />
                          관리자
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="일반"
                            checked={props.updateSelectedUser.t_employee_auth !== 1}
                            onChange={handleUserRoleChange}
                          />
                          일반
                        </label>
                      </td>
                        )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="detailBoxFormButton">
              <button
                type="button"
                className="detailBoxFormCancelButton"
                onClick={handleXClick}
              >
                취소
              </button>
              {props.operateRegisMode ? 
              (<button
                type="button"
                className="detailBoxFormSaveButton"
                onClick={handleSaveClick}
              >
                저장
              </button>) : 
              (<button
                type="button"
                className="detailBoxFormSaveButton"
                onClick={handleUpdateClick}
              >
                저장
              </button>)}
            </div>
          </WrappingDetailBox>
        </div>
    </WrappingGridBox>
  );
}
export default BasicGridBox;
