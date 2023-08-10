import styled from "styled-components";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import BasicTreeViewList from "./management/BasicTreeViewList";
import BasicListTabs from "./management/BasicListTabs";
import { useEffect, useState } from "react";
import axiosApi from "../../AxiosApi";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearChosenOnes } from "../../store";
import { Spinner } from "react-bootstrap";
import _ from "lodash";

const CsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0 35px;
  display: block;
`;
const CsSubTitle = styled.div`
  position: relative;
  height: 62px;
  margin-bottom: 5px;
  padding: 28px 0 0;
  border-bottom: 1px solid #e5e5e5;
  h2 {
    float: left;
    margin-right: 10px;
    font-size: 20px;
    color: #555;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
  }
  p {
    float: left;
    margin: 6px 10px 0;
    font-size: 13px;
    font-weight: 200;
    color: #4a4a4a;
    vertical-align: top;
    padding: 0;
  }
`;
const WrappedTreeView = styled.div`
  padding-top: 25px;
  overflow: hidden;
  position: absolute;
  top: 94px;
  bottom: 20px;
  left: 34px;
  right: 0;
  margin-top: 0;
  padding-left: 0;
  min-width: 280px;
`;
const BasicTreeViewDepth = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  float: left;
  width: 280px;
  text-align: left;
  .treeViewTit {
    position: relative;
    padding: 5px 0;
  }
  h2 {
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
    margin: 0;
    padding: 0;
  }
  .buttonBox {
    position: absolute;
    top: 2px;
    right: 0;
  }
  a {
    padding: 0 10px;
    line-height: 27px;
    height: 27px;
    font-size: 6px;
    letter-spacing: -0.5px;
    border: 1px solid #d3d3d3;
    background: #fff;
    text-decoration: none;
    display: inline-block;
    width: auto;
    position: relative;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
  }
  .editOrganizationSaveButton {
    padding: 2px 8px 0;
    margin-top: 5px;
    margin-left: 5px;
    height: 20px;
    font-size: 11px;
    font-family: 돋움, Dotum, Helvetica, Apple SD Gothic Neo, sans-serif !important;
    letter-spacing: -0.5px;
    border: 1px solid #666;
    background: #666;
    color: #fff;
    display: inline-block;
    width: auto;
    position: relative;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
  }
  .editOrganizationButton {
    padding: 2px 8px 0;
    margin-top: 5px;
    margin-left: 5px;
    height: 20px;
    font-size: 11px;
    font-family: 돋움, Dotum, Helvetica, Apple SD Gothic Neo, sans-serif !important;
    letter-spacing: -0.5px;
    border: 1px solid #d3d3d3;
    background: #fff;
    color: #4a4a4a;
    display: inline-block;
    width: auto;
    position: relative;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    cursor: pointer;
    outline: 0;
  }
  span {
    line-height: 27px;
    font-size: 12px;
    letter-spacing: -0.5px;
    color: #4a4a4a;
    font-weight: 400;
    text-align: center;
  }
  .organizationChartBox {
    position: absolute;
    top: 33px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    border: 1px solid #9e9e9e;
    font-size: 13px;
  }
  .organizationList {
    height: 392px;
    border-bottom: 1px solid #f0f0f0;
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding-bottom: 10px;
    box-sizing: border-box;
    user-select: none !important;
  }
  .selectedNodePkBackgroundColor {
    background-color: #c2e2fc;
  }
  .chartTree {
    margin-bottom: 0px;
    overflow: visible;
    height: auto;
    position: relative;
  }
  .mTree {
    position: relative;
    user-select: none;
  }
  .nodeInnerCompany {
    position: relative;
    height: auto;
    margin-top: 10px;
    margin-left: 15px;
    padding-left: 20px;
    border-bottom: 0;
    background: 0 0;
    font-size: 14px;
    line-height: 18px;
    padding: 1px 80px 0 0;
  }
  .nodeInnerGroup {
    position: relative;
    height: auto;
    padding-left: 20px;
    margin-left: 35px;
    border-bottom: 0;
    background: 0 0;
    font-size: 14px;
    line-height: 18px;
    padding: 1px 10px 0 0;
  }
  .txtNodeTitleInput {
    height: 25px;
  }
  .buildingIcon {
    overflow: visible;
    color: #1c90fb;
    margin-top: 0;
    width: 18px;
    height: 17px;
    background-position: -100px -100px;
    margin-right: 4px;
    display: inline-block;
    //            line-height: 100em;
    vertical-align: top;
  }
  .MuiSvgIcon-root {
    color: #1c90fb;
  }
  .accordionButton {
    display: flex;
    // align-items: center;
    cursor: pointer;
    padding-left: 10px;
  }

  .accordionIcon {
    margin-right: 5px;
  }

  .accordionButton.open .accordionIcon {
    transform: rotate(90deg);
  }
  .nodeInnerGroup {
    display: none;
    padding-left: 25px;
  }

  .nodeInnerGroup.open {
    display: block;
  }

  .txtNodeTitle {
    cursor: pointer;
    color: rgb(0, 0, 0);
    padding: 4px 5px;
    max-width: calc(100% - 36px);
    margin-top: -4px;
    letter-spacing: -0.3px;
    overflow: hidden;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
  }
  .num {
    color: rgb(28, 144, 251);
    float: right;
    margin-left: 4px;
    font-size: 12px;
    line-height: 18px;
    -webkit-margin-before: 1px;
  }
`;

function Management() {
  // 로그인 유저 정보 리덕스에서 추출
  const loginedUser = useSelector((state) => state.loginUserData);
  // 헤더의 선택 회사
  const [tCompanyNo, setTCompanyNo] = useState("");
  // 직원 목록
  const [employeeList, setEmployeeList] = useState([]);
  // 부서 목록
  const [organizationList, setOrganizationList] = useState([]);
  // 부서 복제 목록 (조직도 수정 취소시 롤백용)
  const [copyOrganizationList, setCopyOrganizationList] = useState([]);
  // 조직 선택 구분 (선택한 인덱스 구분)
  const [selectedRowNum, setSelectedRowNum] = useState(0);
  // 조직 이름 선택 구분 (직원 목록 조건)
  const [selectedOrgaName, setSelectedOrgaName] = useState("");
  // 조직도 편집 모드 (직원리스트 가리기)
  const [editingOrganization, setEditingOrganization] = useState(false);
  // 선택한 리스트 탭의 인덱스를 저장할 state
  const [selectedListTab, setSelectedListTab] = useState(-1);
  // Detail 오프너
  const [isExpanded, setIsExpanded] = useState("false");
  // 아코디언 오프너
  const [accordionOpener, setAccordionOpener] = useState(true);
  // 수정할 조직도의 정보
  const [requestOrganizationList, setRequestOrganizationList] = useState([]);
  // 부서 이름 수정시 input에 입력할 이전 이름
  const [prevEditingOrganizationName, setPrevEditingOrganizationName] =
    useState("");
  // redux dispatch
  const dispatch = useDispatch();
  // 로딩 스피너
  const [loading, setLoading] = useState(false);
  // 무선 스피너
  const pushedSwitch = useSelector((state) => state.spinnerSwitch);
  // 검색 모드
  const [searchMode, setSearchMode] = useState(false);

  // 로그인한 회사로 첫 렌더링
  useEffect(() => {
    // 유저의 회사 중에 헤더의 회사이름과 같은 회사의 PK추출
    const lastCompanyNo =
      loginedUser.company && loginedUser.company.length > 0
        ? loginedUser.company.find(
            (item) => item.t_company_name === loginedUser.companyName
          ).t_company_no
        : loginedUser.company[0].t_company_no;
    setTCompanyNo(lastCompanyNo);
  }, []); // 첫 렌더링

  // 회사 변경마다 회사 업데이트
  useEffect(() => {
    // 유저의 회사 중에 헤더의 회사이름과 같은 회사의 PK추출
    const lastCompanyNo =
      loginedUser.company && loginedUser.company.length > 0
        ? loginedUser.company.find(
            (item) => item.t_company_name === loginedUser.companyName
          ).t_company_no
        : loginedUser.company[0].t_company_no;
    setTCompanyNo(lastCompanyNo);
    // 조직도 선택 값 회사로 초기화
    setSelectedRowNum(0);
    setSelectedOrgaName(loginedUser.companyName);
    setSearchMode(false);
  }, [loginedUser.companyName]); // 헤더의 선택된 회사이름

  // tCompanyNo 값이 변경될 때마다 fetchEmployeeList() 함수 실행
  useEffect(() => {
    // null이 아닐때만 하기 위함
    if (tCompanyNo) {
      // 부서목록 get
      fetchOrganizationList();
      // 직원목록 get
      fetchEmployeeList();
    }
  }, [tCompanyNo]); // 컴포넌트에 적용된 회사PK

  // 무선 스피너 인식
  useEffect(() => {
    setLoading(pushedSwitch);
    if (!pushedSwitch) {
      // 체크박스 모두 해제
      uncheckAllCheckboxes();
      fetchEmployeeList();
    }
  }, [pushedSwitch]); // 푸터의 로딩 스위치

  // 아코디언 오프너 버튼
  const handleCompanyClick = () => {
    if (accordionOpener) {
      setAccordionOpener(false);
    } else {
      setAccordionOpener(true);
    }
  };

  // 조직별 인원수 세기 조직도,직원 변화때
  const countingEmplFromOrga = (orgaName) => {
    return employeeList.filter((emp) => emp.t_organization_name === orgaName)
      .length;
  };

  // 조직도 클릭 이벤트
  const handleItemClick = (rownum, orgaName) => {
    if (isExpanded === "true") {
      setIsExpanded("false");
    }
    setSearchMode(false);
    // 직원 재 조회
    fetchEmployeeList();
    // 조직 선택 구분
    setSelectedRowNum(rownum);
    // 조직 이름 선택 구분
    setSelectedOrgaName(orgaName);
  };

  // 편집, 취소 버튼 클릭
  const handleEditClick = (e) => {
    // 편집 버튼 클릭시
    if (e.target.name == "EditB") {
      setEditingOrganization(true);
      setSearchMode(false);
      dispatch(clearChosenOnes());
      if (isExpanded === "true") {
        setIsExpanded("false");
      }
      // 기존 부서 목록 백업
      const backupList = _.cloneDeep(organizationList);
      setCopyOrganizationList(backupList);
    } else {
      // 취소 버튼 클릭시
      Swal.fire({
        title: "정말로 그렇게 하시겠습니까?",
        text: "다시 되돌릴 수 없습니다. 신중하세요.",
        icon: "warning",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "승인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
        // reverseButtons: true, // 버튼 순서 거꾸로
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          const rollbackList = _.cloneDeep(copyOrganizationList);
          setOrganizationList(rollbackList);
          setEditingOrganization(false);
        }
      });
    }
  };

  // 추가 버튼 클릭
  const handleCreateClick = (e) => {
    // 수정 중인 부서가 있는지 확인
    const isExistEmptyOrganization = organizationList.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );
    if (!isExistEmptyOrganization) {
      // 부서 목록에 빈 부서 추가
      const newOrganization = {
        // 부서의 행번호는 1부터 시작, 인덱스는 0부터 시작이므로, 맨 뒤 행의 rownum의 +1
        rownum: organizationList.length!==0 ? organizationList[organizationList.length - 1].rownum + 1 : 1,
        t_organization_name: "",
        t_organization_no: "",
        t_organization_parent: tCompanyNo,
      };
      // 기존 배열을 복사하고, 새로운 회사 정보를 추가하여 업데이트
      setOrganizationList((prevOrganizationList) => [
        ...prevOrganizationList,
        newOrganization,
      ]);
    } else {
      Swal.fire({
        title: "문제가 발생했습니다.",
        text: "이미 작성중인 부서가 있습니다.",
        icon: "warning",
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
        }
      });
    }
  };

  // 편집 버튼 클릭
  const handleUpdateClick = (e) => {
    // 수정 중인 부서가 있는지 확인
    const isExistEmptyOrganization = organizationList.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );

    if (!isExistEmptyOrganization) {
      if (selectedRowNum != 0) {
        // 편집 input에 세팅해줄 이름
        setPrevEditingOrganizationName(
          organizationList.find(
            (organization) => organization.rownum === selectedRowNum
          ).t_organization_name
        );
        // 편집 대상 index 추출
        const indexToUpdate = organizationList.findIndex(
          (item) => item.rownum === selectedRowNum
        );
        // 조직 목록 불러오기
        const updatingOrganizationList = [...organizationList];
        // 해당 개체 이름 비우기
        updatingOrganizationList[indexToUpdate].t_organization_name = "";
        // 리스트 교체
        setOrganizationList(updatingOrganizationList);
      } else {
        Swal.fire({
          title: "문제가 발생했습니다.",
          text: "회사 이름은 수정할 수 없습니다.",
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
      }
    } else {
      Swal.fire({
        title: "문제가 발생했습니다.",
        text: "이미 작성중인 부서가 있습니다.",
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
    }
  };

  // 삭제 버튼 클릭
  const handleDeleteClick = () => {
    // 수정 중인 부서가 있는지 확인
    const isExistEmptyOrganization = organizationList.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );

    if (!isExistEmptyOrganization) {
      // 해당 부서의 직원수 세오기
      const countedEmpl = countingEmplFromOrga(
        organizationList.find((orga) => orga.rownum === selectedRowNum)
          .t_organization_name
      );
      if (selectedRowNum != 0 && countedEmpl != 0) {
        Swal.fire({
          title: "문제가 발생했습니다.",
          text: "해당 부서에 소속된 직원이 존재하고 있습니다.",
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
      } else if (selectedRowNum != 0 && countedEmpl === 0) {
        // 선택했던 부서 번호
        const tOrgaNo = organizationList.find(
          (item) => item.rownum === selectedRowNum
        ).t_organization_no;
        // 선택한 개체의 index 추출
        const indexToDelete = organizationList.findIndex(
          (item) => item.rownum === selectedRowNum
        );
        // 조직 목록 불러오기
        const deletingOrganizationList = [...organizationList];
        // 해당 개체 잘라내기
        deletingOrganizationList.splice(indexToDelete, 1);
        // 조직 목록 갱신
        setOrganizationList(deletingOrganizationList);
        // 선택 값 변경
        setSelectedRowNum(indexToDelete);

        // 편집 전송 할 배열에 추가
        const proEditiedOrganization = {
          t_organization_name: null,
          t_organization_no: tOrgaNo,
          t_organization_parent: null,
        };
        // 수정 개체
        const prevEditiedOrganization = [
          ...requestOrganizationList,
          proEditiedOrganization,
        ];
        // 수정 목록에 추가
        setRequestOrganizationList(prevEditiedOrganization);
      } else {
        Swal.fire({
          title: "문제가 발생했습니다.",
          text: "회사는 삭제할 수 없습니다.",
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
      }
    } else {
      Swal.fire({
        title: "문제가 발생했습니다.",
        text: "이미 작성중인 부서가 있습니다.",
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
    }
  };

  // 조직도 input 입력값이 변경될 때마다 state 업데이트
  const handleInputKeyPress = (e, rownum) => {
    // input에서 엔터키 입력시, 공백 아닐시
    if (e.key === "Enter" && e.target.value !== "") {
      // 기존 리스트 불러오기
      const updatedOrganizationList = [...organizationList];
      // 편집 대상 index 추출
      const indexToUpdate = updatedOrganizationList.findIndex(
        (item) => item.rownum === rownum
      );
      // 불러온 리스트 중 입력한 개체의 이름 교체
      updatedOrganizationList[indexToUpdate].t_organization_name =
        e.target.value;
      // 교체한 리스트로 갱신
      setOrganizationList(updatedOrganizationList);
      // 교체한 개체 (추가:no없음,name있음 / 수정:no있음,name있음 / 삭제:no있음,name없음)
      const preEditiedOrganization = updatedOrganizationList[indexToUpdate];
      // 수정사항을 담을 개체
      const proEditiedOrganization = {
        t_organization_no: preEditiedOrganization.t_organization_no,
        t_organization_name: preEditiedOrganization.t_organization_name,
        t_organization_parent: tCompanyNo,
      };
      // 수정 개체 추가
      const prevEditiedOrganizationList = [
        ...requestOrganizationList,
        proEditiedOrganization,
      ];
      // 수정 배열 갱신
      setRequestOrganizationList(prevEditiedOrganizationList);
      // 수정 할때 input에 입력 시켜줄 이름 초기화
      setPrevEditingOrganizationName("");
    }
  };

  // 저장 버튼 클릭
  const handleEditSave = () => {
    Swal.fire({
      title: "정말로 그렇게 하시겠습니까?",
      text: "다시 되돌릴 수 없습니다. 신중하세요.",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      // reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        try {
          const response = axiosApi
            .post("/editingOrganization", requestOrganizationList)
            .then(() => {
              setSelectedRowNum(0);
              setRequestOrganizationList([]);
              setCopyOrganizationList([]);
              fetchOrganizationList();
              setEditingOrganization(false);
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // 조직도 조회
  const fetchOrganizationList = async () => {
    try {
      // 로딩 on
      setLoading(true);
      // 체크박스 선택 값 초기화
      dispatch(clearChosenOnes());
      const orgaList = await axiosApi.get("/findOrganizationFromCompany", {
        params: {
          t_company_no: tCompanyNo,
        },
      });
      console.log("조직도 리스트data", orgaList.data);
      setOrganizationList(orgaList.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 직원 목록 조회
  const fetchEmployeeList = async () => {
    if (tCompanyNo) {
      try {
        // 로딩 on
        setLoading(true);
        // 체크박스 선택 값 초기화
        dispatch(clearChosenOnes());
        const emplList = await axiosApi.get("/findUserEmplOrgaFromCompany", {
          params: {
            t_company_no: tCompanyNo,
          },
        });
        console.log("직원 리스트", emplList);
        setEmployeeList(emplList.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // input 태그 값 변경 시 실행되는 함수
  const handleInputChange = (e) => {
    setPrevEditingOrganizationName(e.target.value);
  };

  // 컴포넌트 내의 모든 체크박스의 체크를 해제하는 함수
  const uncheckAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <CsContainer>
      <CsSubTitle>
        <div>
          <h2>조직관리</h2>
          <p>등록된 회사의 조직과 직원정보를 관리할 수 있습니다.</p>
        </div>
      </CsSubTitle>
      <WrappedTreeView>
        <BasicTreeViewDepth>
          <div className="treeViewTit">
            <h2>조직도</h2>
            <div className="buttonBox">
              {editingOrganization ? (
                <>
                  <button
                    className="editOrganizationButton"
                    name="CreateB"
                    onClick={handleCreateClick}
                  >
                    추가
                  </button>
                  <button
                    className="editOrganizationButton"
                    name="UpdateB"
                    onClick={handleUpdateClick}
                  >
                    수정
                  </button>
                  <button
                    className="editOrganizationButton"
                    name="DeleteB"
                    onClick={handleDeleteClick}
                  >
                    삭제
                  </button>
                  <button
                    className="editOrganizationButton"
                    name="CancelB"
                    onClick={handleEditClick}
                  >
                    취소
                  </button>
                  <button
                    className="editOrganizationSaveButton"
                    name="SaveB"
                    onClick={handleEditSave}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="editOrganizationButton"
                    name="EditB"
                    onClick={handleEditClick}
                  >
                    편집
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="organizationChartBox">
            <div className="organizationList">
              <div className="chartTree">
                <div className="mTree">
                  <div className="mNode">
                    <div
                      className={`accordionButton ${
                        accordionOpener ? "open" : ""
                      }`}
                      onClick={() =>
                        handleItemClick(
                          // loginedUser.company.t_company_name,
                          // loginedUser.company.t_company_no,
                          0,
                          loginedUser.companyName
                          // selectedListTab,
                          // loginedUser.company.t_company_no
                        )
                      }
                    >
                      <span
                        className="accordionIcon"
                        onClick={() => handleCompanyClick()}
                      >
                        ＞
                      </span>
                      <span className="buildingIcon">
                        <BusinessOutlinedIcon />
                      </span>
                      <span
                        className={`txtNodeTitle ${
                          selectedRowNum === 0
                            ? "selectedNodePkBackgroundColor"
                            : ""
                        }`}
                      >
                        <span className="num">{employeeList.length}</span>
                        {loginedUser.companyName}
                      </span>
                    </div>

                    {organizationList &&
                      organizationList.map(
                        (organization, organizationIndex) => (
                          <div
                            className={`nodeInnerGroup ${
                              accordionOpener ? "open" : ""
                            }`}
                            key={organizationIndex}
                          >
                            <div
                              className="departmentItem"
                              onClick={() =>
                                handleItemClick(
                                  // organization.t_organization_name,
                                  // organization.t_organization_no,
                                  organization.rownum,
                                  organization.t_organization_name
                                  // selectedListTab,
                                  // loginedUser.user[0].t_company_no
                                )
                              }
                            >
                              <span className="buildingIcon">
                                <FolderTwoToneIcon />
                              </span>
                              <span
                                className={`txtNodeTitle ${
                                  selectedRowNum === organization.rownum
                                    ? "selectedNodePkBackgroundColor"
                                    : ""
                                }`}
                              >
                                <span className="num">
                                  {countingEmplFromOrga(
                                    organization.t_organization_name
                                  )}
                                </span>
                                {organization.t_organization_name === "" ? (
                                  <input
                                    type="text"
                                    value={prevEditingOrganizationName}
                                    onKeyDown={(e) =>
                                      handleInputKeyPress(
                                        e,
                                        organization.rownum
                                      )
                                    }
                                    onChange={handleInputChange} // input 값 변경 시 실행되는 함수
                                    placeholder="새로운 조직 이름 입력"
                                  />
                                ) : (
                                  organization.t_organization_name
                                )}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            {loading && (
              <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ fontSize: "3rem", width: "6rem", height: "6rem" }}
                />
                <div className="mt-3">
                  불러오는 중입니다.
                  <br />
                  잠시만 기다려주세요.
                </div>
              </div>
            )}
          </div>
        </BasicTreeViewDepth>
        <BasicListTabs
          employeeList={employeeList}
          organizationList={organizationList}
          selectedRowNum={selectedRowNum}
          selectedListTab={selectedListTab}
          setSelectedListTab={setSelectedListTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <BasicTreeViewList
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
          organizationList={organizationList}
          selectedOrgaName={selectedOrgaName}
          tCompanyNo={tCompanyNo}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          editingOrganization={editingOrganization}
          selectedListTab={selectedListTab}
          fetchEmployeeList={fetchEmployeeList}
          setLoading={setLoading}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
        />
      </WrappedTreeView>
    </CsContainer>
  );
}
export default Management;
