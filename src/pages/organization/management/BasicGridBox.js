import { styled, css } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { beTheChosenOnes, clearChosenOnes, pushSwitch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosApi from "../../../AxiosApi";
import BasicGridBoxItem from "./BasicGridBoxItem";
import Swal from "sweetalert2";
import { Slide } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

const WrappingGridBox = styled.div.attrs(({ $isexpanded }) => ({
  // isexpanded prop를 DOM 요소로 전달합니다.
  isexpanded: $isexpanded,
}))`
  height: 100%;
  .noEmpl{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90%;
  }
  .noEmpl > img{
    width: 70px;
    height: 70px;
    vertical-align: middle;
  }
  .noEmpl > span{
    margin-top: 10px;
    width: 150px;
    vertical-align: middle;
    color: gray;
  }
  .searchThing{
    color: #1c90fb;
  }
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
  select {
    width: 200px;
    height: 25px;
  }
  input[type="text"] {
    width: 200px;
    height: 25px;
  }
  input[type="radio"] {
    height: 15px;
    width: 15px;
    margin-right: 5px;
    margin-left: 5px;
    vertical-align: text-bottom;
  }
  .selectedRow {
    background-color: #c2e2fc;
  }
`;

const WrappingDetailBox = styled.div`
  height: 700px;
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

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function BasicGridBox(props) {
  // 선택한 직원 정보
  const [selectedUser, setSelectedUser] = useState(null);
  // 이미지 등록 참조
  const fileInputRef = useRef(null);
  // 이미지 저장용
  const [selectedImage, setSelectedImage] = useState(null);
  // 로그인 유저 정보
  const loginedUser = useSelector((state) => state.loginUserData);
  // 스낵바
  const [snackOpen, setSnackOpen] = useState(false);
  // 스낵바 메세지
  const [snackText, setSnackText] = useState("중복된 이메일 입니다.");
  // 직원 목록 필터링
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);

  // 유효성 검사
  let nameRegex = /^[가-힣a-zA-Z]+$/;
  let numberRegex = /^\d{11}$/;
  let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  useEffect(() => {
    updateOnesDate(props.selectedDate);
  }, [props.selectedDate]);

  // 직원 필터링
  useEffect(() => {
    setFilteredEmployeeList((props.searchMode && props.searchEmployeeList.length > 0
      ? props.searchEmployeeList
      : props.employeeList
    ).filter((user) => {
      const isTabSelected = props.selectedListTab === -1 ||
      user.t_employee_state === props.selectedListTab;
      const isOrgaNameSelected = props.selectedOrgaName === loginedUser.companyName ||
        props.selectedOrgaName === user.t_organization_name;
      return isTabSelected && isOrgaNameSelected;    
    }));
  }, [props.searchMode, props.searchEmployeeList, props.employeeList, props.selectedListTab]);

  // 직원 행 클릭 이벤트
  const handleRowClick = (user) => {
    clearAllInputFiles();
    setSelectedImage(null);
    props.setOperateRegisMode(false);
    setSelectedUser(user);
    props.setUpdateSelectedUser({
      ...user,
      t_user_photo_path_prev: user.t_user_photo_path,
    });
    props.setShowMyThumbnail(user.t_user_photo_path);
    console.log("dsdsd", props.updateSelectedUser);
    props.setIsExpanded("true");
    props.setSelectedDate(new Date(JSON.stringify(user.t_employee_date)));
    // 페이지를 최상단으로 스크롤
    props.scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Detail X버튼 클릭 이벤트
  const handleXClick = () => {
    props.setUpdateSelectedUser([]);
    setSelectedUser(null);
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

    const checkedEmployee = Array.isArray(dataOfTheChosenOnes.checkedEmployee)
      ? dataOfTheChosenOnes.checkedEmployee
      : [];

    if (e.target.checked) {
      const updateDataOfTheChosenOnes = {
        ...dataOfTheChosenOnes,
        checkedEmployee: [
          ...checkedEmployee,
          {
            t_user_no: user.t_user_no,
            t_user_name: user.t_user_name,
            t_user_email: user.t_user_email,
            t_company_no: user.t_company_no,
            t_company_name: user.t_company_name,
            t_organization_name: user.t_organization_name,
            t_employee_duty: user.t_employee_duty,
            t_employee_position: user.t_employee_position,
            t_employee_no: user.t_employee_no,
          },
        ],
      };
      dispatch(beTheChosenOnes(updateDataOfTheChosenOnes));
    } else {
      const updatedCheckedEmployee = checkedEmployee.filter(
        (item) => item.t_user_no !== user.t_user_no
      );
      const updateDataOfTheChosenOnes = {
        ...dataOfTheChosenOnes,
        checkedEmployee: updatedCheckedEmployee,
      };
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
      editedUpdateSelectedUser.t_organization_no =
        e.target.options[e.target.selectedIndex].dataset.label;
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
    if (event.target.value === "관리자") {
      props.setUpdateSelectedUser({
        ...props.updateSelectedUser,
        t_employee_auth: 1,
      });
    } else if (event.target.value === "일반") {
      props.setUpdateSelectedUser({
        ...props.updateSelectedUser,
        t_employee_auth: 2,
      });
    }
  };

  // 개인정보 날짜 수정 이벤트
  const updateOnesDate = (e) => {
    const editedUpdateSelectedUser = { ...props.updateSelectedUser };
    editedUpdateSelectedUser.t_employee_date = `${e.getFullYear()}-${(
      "0" +
      (e.getMonth() + 1)
    ).slice(-2)}-${("0" + e.getDate()).slice(-2)}`;
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
      t_user_photo_name: "기본사진",
      t_user_photo_path: "https://static.wehago.com/imgs/dummy/@dummy_02.jpg",
    });
    props.setShowMyThumbnail(
      "https://static.wehago.com/imgs/dummy/@dummy_02.jpg"
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 입력 요소의 값을 비움
    }
  };

  // 파일 변경 이벤트
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("파일", selectedFile);
    if (!selectedFile) {
      return;
    }

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

  // 저장버튼 유효성 검사
  const handleSaveClick = async () => {
    if(props.updateSelectedUser.t_user_name == null || props.updateSelectedUser.t_user_name == '' ||
      props.updateSelectedUser.t_employee_position == null || props.updateSelectedUser.t_employee_position == '' ||
      props.updateSelectedUser.t_employee_duty == null || props.updateSelectedUser.t_employee_duty == '' ||
      props.updateSelectedUser.t_user_phone == null || props.updateSelectedUser.t_user_phone == '' ||
      props.updateSelectedUser.t_user_email == null || props.updateSelectedUser.t_user_email == ''
      ){
        Swal.fire({
          title: "등록에 실패했습니다.",
          text: "입력하지 않은 항목이 존재합니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        }).then((result) => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면
            console.log(result);
          }
        });
    }else if(!nameRegex.test(props.updateSelectedUser.t_user_name) ||
      !numberRegex.test(props.updateSelectedUser.t_user_phone) ||
      !emailRegex.test(props.updateSelectedUser.t_user_email)
    ){
      let swalText = '';
      if(!nameRegex.test(props.updateSelectedUser.t_user_name)){
        swalText = "이름은 한글과 영문만 입력 가능합니다.";
      }else if(!numberRegex.test(props.updateSelectedUser.t_user_phone)){
        swalText = "휴대전화번호 11자리를 올바르게 입력해주세요.";
      }else{
        swalText = "올바른 이메일 형식이 아닙니다.";
      }
      Swal.fire({
        title: "등록에 실패했습니다.",
        text: swalText,
        icon: "warning",
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          console.log(result);
        }
      });
    }else{
      props.setLoading(true);
      requestSaveClick();
      props.setLoading(false);
    }
  };

  const handleSnackOpen = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  // 저장버튼 이벤트 등록
  const requestSaveClick = async () => {
    try {
      props.setLoading(true);
      // 이미지 파일 저장
      let uploadedImageName = "기본사진";
      let uploadedImagePath =
        "https://static.wehago.com/imgs/dummy/@dummy_02.jpg";
      // 이미지 파일 저장
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
          const response = await axiosApi.post(
            "/uploadEmployeePhoto",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
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
        await props.fetchEmployeeList();
        props.setIsExpanded("false");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // 파일 입력 요소의 값을 비움
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 저장버튼(수정) 유효성 검사
  const handleUpdateClick = async () => {
    if(props.updateSelectedUser.t_employee_position == null || props.updateSelectedUser.t_employee_position == '' ||
      props.updateSelectedUser.t_employee_duty == null || props.updateSelectedUser.t_employee_duty == ''
      ){
        Swal.fire({
          title: "수정에 실패했습니다.",
          text: "입력하지 않은 항목이 존재합니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        }).then((result) => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면
            console.log(result);
          }
        });
    }else{
      requestUpdateClick();
    }
  };

  // 저장버튼 이벤트 수정
  const requestUpdateClick = async () => {
    console.log("props.updateSelectedUser", props.updateSelectedUser);
    try {
      props.setLoading(true);
      // 이전 이미지 경로를 만듭니다.
      const prevImagePath = props.updateSelectedUser.t_user_photo_path_prev;
      console.log("여까진 오는가벼",prevImagePath);
      // 이전 이미지 경로가 'http:'로 시작하는지 확인합니다.
      if (prevImagePath !== props.updateSelectedUser.t_user_photo_path && prevImagePath.startsWith("http:")) {
        console.log("여까진 못 오는가벼");
        // '...images/' 뒷부분만 추출하여 파일명으로 사용합니다.
        const fileName = prevImagePath.substring(prevImagePath.lastIndexOf("images/") + 7);
        console.log("fileName",fileName);
        // 이미지 삭제 함수 호출
        await deleteEmployeePhoto(fileName);
      }

      // 이미지 파일 저장
      let uploadedImagePath = "";
      // 이미지 파일 저장
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        try {
          const response = await axiosApi.post(
            "/uploadEmployeePhoto",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("업로드 완료:", response.data);
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
          ...(uploadedImagePath !== ""
            ? { t_user_photo_path: uploadedImagePath }
            : {}),
        };
        await axiosApi.put("/modifyRoomForAOldEmployee", updatedUser);
        await props.fetchEmployeeList();
        props.setIsExpanded("false");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // 파일 입력 요소의 값을 비움
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지 삭제 함수
  const deleteEmployeePhoto = async (fileName) => {
    try {
      await axiosApi.post("/deleteEmployeePhoto", fileName);
      console.log("이미지 삭제 성공");
      // 이미지 삭제 후 필요한 처리를 수행할 수 있습니다.
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      // 이미지 삭제에 실패했을 경우 필요한 처리를 수행할 수 있습니다.
    }
  };

  // 컴포넌트 내의 모든 체크박스의 체크를 해제하는 함수
  const clearAllInputFiles = () => {
    const inputFiles = document.querySelectorAll('input[type="file"]');
    inputFiles.forEach((inputFile) => {
      inputFile.value = null;
    });
  };

  // 메일 발송 요청
  const requestSendMail = async () => {
    dispatch(pushSwitch(true));
    let tCompanyNo =
      loginedUser.company && loginedUser.company.length > 0
        ? loginedUser.company.find(
            (item) => item.t_company_name === loginedUser.companyName
          ).t_company_no
        : loginedUser.company[0].t_company_no;
    let myCheckedEmployee = [{
      t_employee_no: props.updateSelectedUser.t_employee_no,
      t_user_no: props.updateSelectedUser.t_user_no,
      t_user_name: props.updateSelectedUser.t_user_name,
      t_user_email: props.updateSelectedUser.t_user_email,
      t_company_no: tCompanyNo,
      t_company_name: loginedUser.companyName,
      t_organization_name: props.updateSelectedUser.t_organization_name,
      t_employee_duty: props.updateSelectedUser.t_employee_duty,
      t_employee_position: props.updateSelectedUser.t_employee_position,
    },];
    console.log("myCheckedEmployee",myCheckedEmployee);
    await axiosApi.post("/sendMailToEmployee", {
      employer: loginedUser.user.name,
      checkedEmployee: myCheckedEmployee,
    });
    dispatch(pushSwitch(false));
  };

  // Detail 메일 발송 버튼
  const handleSendMailButton = () => {
    try {
      Swal.fire({
        title: "메일을 발송합니다.",
        text: "선택한 직원에게 메일을 보내시겠습니까?",
        icon: "question",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
        requestSendMail();
        dispatch(clearChosenOnes());
        }
      });
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      // 오류 상황을 처리하거나 오류 메시지를 표시하는 등의 작업을 수행합니다.
    }
  };

  // 직원 상태 수정 이벤트
  const handleUpdateEmployeeStateButton = (empState) => {
    try {
      let alertText = "";

    // state에 따라 다른 문구 설정
    switch (empState) {
      case 3:
        alertText = "선택한 직원을 정말로 사용중지 하시겠습니까?";
        break;
      case 2:
        alertText = "선택한 직원을 정말로 중지해제 하시겠습니까?";
        break;
      default: // -1
        alertText = "선택한 직원을 정말로 내보내시겠습니까?";
        break;
    }

      Swal.fire({
        title: "직원을 관리합니다.",
        text: alertText,
        icon: "warning",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          requestUpdateEmployeeState(empState);
        }
      });
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      // 오류 상황을 처리하거나 오류 메시지를 표시하는 등의 작업을 수행합니다.
    }
    // detail 닫고, updateempl 초기화 
  };

  // 상태 수정 요청 함수
  const requestUpdateEmployeeState = async (empState) => {
    dispatch(pushSwitch(true));
    let myCheckedEmployee = [{
      t_employee_no: props.updateSelectedUser.t_employee_no,
    }]
    await axiosApi.put("/updateEmployeeState", {
      t_employee_state: empState,
      checkedEmployee: myCheckedEmployee,
    });
    dispatch(clearChosenOnes());
    dispatch(pushSwitch(false));
  };

  // 컴포넌트 내의 모든 체크박스의 체크 함수
  const checkAllCheckboxes = () => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let enabledCheckboxes = Array.from(checkboxes).filter((checkbox) => !checkbox.disabled);
    let checkedCheckboxes = Array.from(enabledCheckboxes).filter((checkbox) => checkbox.checked);
  
    if (enabledCheckboxes.length / 2 >= checkedCheckboxes.length) {
      enabledCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      enabledCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    checkboxes = document.querySelectorAll('input[type="checkbox"]');
    enabledCheckboxes = Array.from(checkboxes).filter((checkbox) => !checkbox.disabled);
    checkedCheckboxes = Array.from(enabledCheckboxes).filter((checkbox) => checkbox.checked);

    // 체크된 체크박스와 체크되지 않은 체크박스들의 id 값 추출
    const checkedIds = checkedCheckboxes.map((checkbox) => checkbox.id);
    const uncheckedIds = enabledCheckboxes.filter((checkbox) => !checkbox.checked).map((checkbox) => checkbox.id);
    // 추출한 id 값과 일치하는 user 객체 찾기
    const checkedUsers = props.employeeList.filter((user) => checkedIds.includes(user.t_user_no.toString()));
    const uncheckedUsers = props.employeeList.filter((user) => uncheckedIds.includes(user.t_user_no.toString()));

    // chosenOnes 함수 호출
    chosenTwos(checkedUsers, uncheckedUsers);
  };
  
  // 체크박스 이벤트
const chosenTwos = (checkedUsers, uncheckedUsers) => {

  const checkedEmployee = Array.isArray(dataOfTheChosenOnes.checkedEmployee)
    ? [...dataOfTheChosenOnes.checkedEmployee] // 새로운 배열 생성
    : [];

  // checkedUsers 배열의 유저들을 checkedEmployee에 추가
  checkedUsers.forEach((user) => {
    const isAlreadyChecked = checkedEmployee.some((item) => item.t_user_no === user.t_user_no);
    if (!isAlreadyChecked) {
      checkedEmployee.push({
        t_user_no: user.t_user_no,
        t_user_name: user.t_user_name,
        t_user_email: user.t_user_email,
        t_company_no: user.t_company_no,
        t_company_name: user.t_company_name,
        t_organization_name: user.t_organization_name,
        t_employee_duty: user.t_employee_duty,
        t_employee_position: user.t_employee_position,
        t_employee_no: user.t_employee_no,
      });
    }
  });

  // uncheckedUsers 배열의 유저들을 checkedEmployee에서 제거
  uncheckedUsers.forEach((user) => {
    const index = checkedEmployee.findIndex((item) => item.t_user_no === user.t_user_no);
    if (index !== -1) {
      checkedEmployee.splice(index, 1);
    }
  });

  const updateDataOfTheChosenOnes = {
    ...dataOfTheChosenOnes,
    checkedEmployee: checkedEmployee,
  };
  dispatch(beTheChosenOnes(updateDataOfTheChosenOnes));
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
                  <th onClick={checkAllCheckboxes}>V</th>
                  <th>이름</th>
                  <th>소속</th>
                  <th>직급</th>
                  <th>이메일주소</th>
                  <th>핸드폰번호</th>
                  <th>입사일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
              {filteredEmployeeList && (filteredEmployeeList
                ).map((user) => {
                    return (
                      <BasicGridBoxItem
                        key={user.t_user_no} // 유니크한 key를 반드시 지정해줘야 합니다.
                        user={user}
                        handleRowClick={handleRowClick}
                        chosenOnes={chosenOnes}
                        selectedUser={selectedUser}
                        searchInputText={props.searchInputText}
                        searchMode={props.searchMode}
                        selectedListTab={props.selectedListTab}
                      />
                    );
                })}
              </tbody>
            </table>
            {filteredEmployeeList.length < 1 && 
              (<div className="noEmpl">
                      <img src="https://static.wehago.com/script/assets/cimgs/ico_nodata.png" />
                      <span className="small-text text-muted">직원이 없습니다.</span>
                    </div>)}
          </div>
        </div>
      </div>
      <div className="user-detail">
        <WrappingDetailBox ref={props.scrollRef}>
          <div className="detailBoxTit">
            <h2>직원정보</h2>
            {(props.operateRegisMode || props.updateSelectedUser.t_employee_auth === 0) ||
              (props.updateSelectedUser.t_employee_state === 3 ? (
                <div className="detailBoxButtonBox">
                  <button type="button" className="detailBoxBB" onClick={() => handleUpdateEmployeeStateButton(2)}>
                    중지해제
                  </button>
                  <button type="button" className="detailBoxBB" onClick={() => handleUpdateEmployeeStateButton(-1)}>
                    퇴사
                  </button>
                  <button
                    type="button"
                    className="detailBoxBX"
                    onClick={handleXClick}
                  >
                    Ｘ
                  </button>
                </div>
              ) : props.operateRegisMode ||
                props.updateSelectedUser.t_employee_state === 2 ? (
                <div className="detailBoxButtonBox">
                  <button type="button" className="detailBoxBB" onClick={() => handleUpdateEmployeeStateButton(3)}>
                    사용중지
                  </button>
                  <button type="button" className="detailBoxBB" onClick={() => handleUpdateEmployeeStateButton(-1)}>
                    퇴사
                  </button>
                  <button
                    type="button"
                    className="detailBoxBX"
                    onClick={handleXClick}
                  >
                    Ｘ
                  </button>
                </div>
              ) : (
                <div className="detailBoxButtonBox">
                  <button type="button" className="detailBoxBB" onClick={handleSendMailButton}>
                    메일발송
                  </button>
                  <button type="button" className="detailBoxBB" onClick={() => handleUpdateEmployeeStateButton(-1)}>
                    직원삭제
                  </button>
                  <button
                    type="button"
                    className="detailBoxBX"
                    onClick={handleXClick}
                  >
                    Ｘ
                  </button>
                </div>
              ))}
              {(props.operateRegisMode || props.updateSelectedUser.t_employee_auth === 0) ? (
                <div className="detailBoxButtonBox">
                <button
                  type="button"
                  className="detailBoxBX"
                  onClick={handleXClick}
                >
                  Ｘ
                </button>
              </div>
              ) : ('')}
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
                  id="target-img"
                  className="detailBoxStaffPhoto"
                />
              </div>
              <div className="detailBoxProfBt">
                <div className="detailBoxProfInfo">
                  {props.operateRegisMode
                    ? ""
                    : props.updateSelectedUser.t_user_name}
                  <span className="detailBoxProfId">
                    {props.operateRegisMode
                      ? ""
                      : props.updateSelectedUser.t_user_id}
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
                    프로필 사진을 등록 또는 삭제한 후 저장 버튼을 클릭해주세요.
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
                          placeholder="한글과 영문만 입력 가능합니다."
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
                      <select
                        name="su-orname"
                        onChange={(e) => updateOnes(e)}
                        value={
                          props.updateSelectedUser.t_organization_name || ""
                        }
                      >
                        <option value={loginedUser.companyName} data-label="-1">
                          {loginedUser.companyName}
                        </option>
                        {props.organizationList.map((department) => {
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
                        })}
                      </select>
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
                    <th>입사일</th>
                    <td>
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        shouldCloseOnSelect
                        selected={props.selectedDate}
                        defaultValue
                        onChange={(date) => props.setSelectedDate(date)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>핸드폰번호</th>
                    <td>
                      {props.operateRegisMode ? (
                        <input
                          type="text"
                          name="su-usphon"
                          placeholder="핸드폰번호 11자리를 입력하세요."
                          value={props.updateSelectedUser.t_user_phone || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      ) : (
                        <label>
                          {props.updateSelectedUser.t_user_phone || ""}
                        </label>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>이메일주소</th>
                    <td>
                      {props.operateRegisMode ? (
                        <input
                          type="text"
                          name="su-usemai"
                          placeholder="이메일 형식으로 입력하세요."
                          value={props.updateSelectedUser.t_user_email || ""}
                          onChange={(e) => updateOnes(e)}
                        />
                      ) : (
                        <label>
                          {props.updateSelectedUser.t_user_email || ""}
                        </label>
                      )}
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
                    {props.updateSelectedUser.t_employee_auth === 0 ? (
                      <td>
                        <label>
                          <input type="radio" value="0" checked />
                          마스터
                        </label>
                      </td>
                    ) : (
                      <td>
                        <label>
                          <input
                            type="radio"
                            value="관리자"
                            checked={
                              props.updateSelectedUser.t_employee_auth === 1
                            }
                            onChange={handleUserRoleChange}
                          />
                          관리자
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="일반"
                            checked={
                              props.updateSelectedUser.t_employee_auth !== 1
                            }
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
            {props.operateRegisMode ? (
              <button
                type="button"
                className="detailBoxFormSaveButton"
                onClick={handleSaveClick}
              >
                저장
              </button>
            ) : (
              <button
                type="button"
                className="detailBoxFormSaveButton"
                onClick={handleUpdateClick}
              >
                저장
              </button>
            )}
          </div>
        </WrappingDetailBox>
      </div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        TransitionComponent={TransitionUp}
        message={snackText}
        // key={transition ? transition.name : ''}
      />
    </WrappingGridBox>
  );
}
export default BasicGridBox;
