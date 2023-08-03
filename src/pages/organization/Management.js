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
  // 토큰으로 회원번호
  const [tUserNo, setTUserNo] = useState('');
  // 회원번호로 회사번호, 회사이름
  const [myCompanyInfo, setMyCompanyInfo] = useState([]);
  // 회원번호로 회사, 부서 목록
  const [myWorkPlace, setMyWorkPlace] = useState([]);
  // 수정 버튼 ON/OFF
  const [editingOrganization, setEditingOrganization] = useState(false);
  // 선택한 요소의 이름 저장
  const [editingItem, setEditingItem] = useState(null);
  // 선택한 회사 또는 부서의 PK
  const [selectedNodePk, setSelectedNodePk] = useState(null);
  // 선택한 노드 인덱스를 저장할 state
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(-1);
  // 선택한 리스트 탭의 인덱스를 저장할 state
  const [selectedListTab, setSelectedListTab] = useState(-1);
  // 회사, 조직에 해당하는 유저들의 목록
  const [showingMyEmployees, setShowingMyEmployees] = useState([]);
  // Detail 오프너
  const [isExpanded, setIsExpanded] = useState("false");
  // 아코디언 오프너
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState([]);
  // 선택한 개체의 회사고유번호
  const [selectedCompanyPk, setSelectedCompanyPk] = useState(null);
  // 선택한 개체의 회사의 직원 상태
  const [selectedEmployeeState, setSelectedEmployeeState] = useState([]);
  // 수정할 조직도의 정보
  const [proEditiedOrganization, setProEditiedOrganization] = useState([]);
  // 부서 이름 수정시 input에 입력할 이전 이름
  const [prevEditingOrganizationName, setPrevEditingOrganizationName] = useState("");
  // redux dispatch
  const dispatch = useDispatch();
  // 로딩 스피너
  const[loading, setLoading] = useState(false);
  // 로그인 유저 정보
  const loginedUser = useSelector((state) => state.loginUserData);
  // 무선 스피너
  const pushedSwitch = useSelector((state) => state.spinnerSwitch);

  // 무선 스피너 인식
  useEffect(() => {
    console.log("pushedSwitch",pushedSwitch);
    setLoading(pushedSwitch);
    if(!pushedSwitch){
      fetchData();
      uncheckAllCheckboxes();
    }
  },[pushedSwitch]);

  // loginedUser 값이 변경될 때마다 TUserNo 값을 업데이트
  useEffect(() => {
    setTUserNo(loginedUser.user.no);
  }, [loginedUser]);

  // TUserNo 값이 변경될 때마다 fetchData() 함수 실행
  useEffect(() => {
    if(tUserNo){
      fetchData();
    }
  }, [tUserNo]);

  // 선택 값에 따라 직원 목록 갱신
  useEffect(() => {
    const fetchMyEmpl = async () => {
      if (
        editingItem != null &&
        selectedNodePk != null &&
        selectedNodeIndex != null &&
        selectedListTab != null &&
        editingOrganization === false
      ) {
        await showMyEmployees(
          editingItem,
          selectedNodePk,
          selectedNodeIndex,
          selectedListTab
        );
        uncheckAllCheckboxes();
        showMyEmployeeState(selectedNodePk, selectedNodeIndex);
        dispatch(clearChosenOnes());
      }
    };
  
    fetchMyEmpl();

    
  }, [editingItem, selectedNodePk, selectedNodeIndex, selectedListTab]);

  // 선택 개체에 따라 직원 상태 갱신
  useEffect(() => {
    if (selectedCompanyPk != null) {
      // showMyEmployeeState(selectedCompanyPk, selectedNodeIndex);
      dispatch(clearChosenOnes());
    }
  }, [selectedCompanyPk]);

  // 아코디언 오프너 버튼
  const handleCompanyClick = (companyIndex) => {
    setSelectedCompanyIndex(
      companyIndex === selectedCompanyIndex ? -1 : companyIndex
    );
  };

  // 조직도 클릭 이벤트
  const handleItemClick = (name, pk, index, listTab, compk) => {
    if (isExpanded === "true") {
      setIsExpanded("false");
    }
    console.log("name, pk, index, listTab, compk",name, pk, index, listTab, compk);
    // index = -1이면 회사이름, 0이면 조직이름
    setEditingItem(name);
    // index = -1이면 회사번호, 0이면 조직번호
    setSelectedNodePk(pk);
    // -1이면 회사, 0이면 조직
    setSelectedNodeIndex(index);
    // 상태
    setSelectedNodeIndex(listTab);
    // 회사 번호
    setSelectedCompanyPk(compk);
  };

  // 수정, 취소 버튼 클릭
  const handleEditClick = (e) => {
    if (e.target.name == "EditB") {
      setEditingOrganization(true);
      dispatch(clearChosenOnes());
      if (isExpanded === "true") {
        setIsExpanded("false");
      }
    } else {
      console.log(proEditiedOrganization);
      console.log("mw", myWorkPlace);
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
          fetchData();
          setEditingOrganization(false);
        }
      });
    }
  };

  // 추가 버튼 클릭
  const handleCreateClick = (e) => {
    const isExistEmptyOrganization = myWorkPlace.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );

    if (!isExistEmptyOrganization) {
      const newCompany = {
        t_company_no: selectedCompanyPk,
        t_company_name: "",
        t_organization_no:
          (myWorkPlace[myWorkPlace.length - 1].row_index + 1) * -1,
        t_organization_name: "",
        company_employee_count: 0,
        organization_employee_count: 0,
        row_index: myWorkPlace[myWorkPlace.length - 1].row_index + 1,
      };
      // 기존 myWorkPlace 배열을 복사하고, 새로운 회사 정보를 추가하여 업데이트
      setMyWorkPlace((prevWorkPlace) => [...prevWorkPlace, newCompany]);
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
    const isExistEmptyOrganization = myWorkPlace.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );

    if (!isExistEmptyOrganization) {
      const company = myWorkPlace.find(
        (c) => c.t_organization_no === selectedNodePk
      );
      if (company != null) {
        setPrevEditingOrganizationName(company.t_organization_name);
        const indexToUpdate = myWorkPlace.findIndex(
          (item) => item.t_organization_no === selectedNodePk
        );
        const updatingMyWorkplace = [...myWorkPlace];
        updatingMyWorkplace[indexToUpdate].t_organization_name = "";
        setMyWorkPlace(updatingMyWorkplace);
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
  const handleDeleteClick = (e) => {
    const isExistEmptyOrganization = myWorkPlace.some((item) =>
      item.t_organization_name === null
        ? false
        : item.t_organization_name.trim() === ""
    );

    if (!isExistEmptyOrganization) {
      const company = myWorkPlace.find(
        (c) => c.t_organization_no === selectedNodePk
      );
      if (company != null && company.organization_employee_count != 0) {
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
      } else if (company != null && company.organization_employee_count === 0) {
        const indexToDelete = myWorkPlace.findIndex(
          (item) => item.t_organization_no === selectedNodePk
        );
        const deletingMyWorkplace = [...myWorkPlace];
        deletingMyWorkplace.splice(indexToDelete, 1);
        setMyWorkPlace(deletingMyWorkplace);
        // 편집 전송 할 배열에 추가
        const proEditiedWorkPlace = {
          t_organization_name: null,
          t_company_no: null,
          t_organization_no: selectedNodePk,
        };
        const prevEditiedOrganization = [
          ...proEditiedOrganization,
          proEditiedWorkPlace,
        ];
        setProEditiedOrganization(prevEditiedOrganization);
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
  const handleInputKeyPress = (e, rowIndex) => {
    if (e.key === "Enter") {
      const updatedWorkPlace = [...myWorkPlace];
      updatedWorkPlace[rowIndex - 1].t_organization_name = e.target.value;
      setMyWorkPlace(updatedWorkPlace);

      const preEditiedWorkPlace = updatedWorkPlace[rowIndex - 1];
      const proEditiedWorkPlace = {
        t_organization_name: preEditiedWorkPlace.t_organization_name,
        t_company_no: preEditiedWorkPlace.t_company_no,
        t_organization_no: preEditiedWorkPlace.t_organization_no,
      };
      const prevEditiedOrganization = [
        ...proEditiedOrganization,
        proEditiedWorkPlace,
      ];
      setProEditiedOrganization(prevEditiedOrganization);
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
            .post("/editingOrganization", proEditiedOrganization)
            .then((res) => {
              setProEditiedOrganization([]);
              fetchData();
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

  // 첫 렌더링에 가져올 값
  const fetchData = async () => {
    try {
      setLoading(true);
      dispatch(clearChosenOnes());
      const res = await axiosApi.get("/showMyCompanyInfo", {
        params: {
          t_user_no: tUserNo,
        },
      });
      const response = await axiosApi.get("/showMyWorkPlace", {
        params: {
          t_user_no: tUserNo,
        },
      });
      console.log("response", response);
      console.log("showMyWorkPlace",response.data);
      console.log("showMyCompanyInfo",res.data);
      setMyCompanyInfo(res.data);
      setMyWorkPlace(response.data);
      setSelectedCompanyIndex(0);
      setSelectedListTab(-1);
      setEditingItem(response.data[0].t_company_name);
      setSelectedNodeIndex(-1);
      setSelectedNodePk(response.data[0].t_company_no);
      setSelectedCompanyPk(response.data[0].t_company_no);
      setProEditiedOrganization([]);
      //갱신 부분
      showMyEmployees(
        response.data[0].t_company_name,
        response.data[0].t_company_no,
        -1,
        -1
      );
      showMyEmployeeState(response.data[0].t_company_no, -1);
      dispatch(clearChosenOnes());
    } catch (error) {
      console.error(error);
    } finally {
        setLoading(false);
    }
  };

  // 직원 리스트 Select
  const showMyEmployees = async (item, pk, index, list) => {
    try {
      setLoading(true);
      console.log("item, pk, index, list",item, pk, index, list);
      const response = await axiosApi
        .get("/showMyEmployees", {
          params: {
            nodeName: item,
            pk: pk,
            index: index,
            t_employee_state: list,
          },
        });
          setShowingMyEmployees(response.data);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  // 직원 상태 Select
  const showMyEmployeeState = (pk, index) => {
    try {
      const response = axiosApi
        .get("/showMyEmployeeState", {
          params: {
            pk: pk,
            index: index,
          },
        })
        .then((res) => {
          setSelectedEmployeeState(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
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
                  {myCompanyInfo.map((companyName, companyIndex) => {
                    const departments = myWorkPlace.filter(
                      (company) =>
                        company.t_company_no === companyName.t_company_no
                    );
                    return (
                      <div className="mNode" key={companyIndex}>
                        <div
                          className={`accordionButton ${
                            selectedCompanyIndex === companyIndex ? "open" : ""
                          }`}
                          onClick={() =>
                            handleItemClick(
                              companyName.t_company_name,
                              companyName.t_company_no,
                              -1,
                              selectedListTab,
                              companyName.t_company_no
                            )
                          }
                        >
                          <span
                            className="accordionIcon"
                            onClick={() => handleCompanyClick(companyIndex)}
                          >
                            {selectedCompanyIndex === companyIndex
                              ? "＞"
                              : "＞"}
                          </span>
                          <span className="buildingIcon">
                            <BusinessOutlinedIcon />
                          </span>
                          <span
                            className={`txtNodeTitle ${
                              selectedNodePk === companyName.t_company_no
                                ? "selectedNodePkBackgroundColor"
                                : ""
                            }`}
                          >
                            <span className="num">
                              {companyName.company_employee_count}
                            </span>
                            {companyName.t_company_name}
                          </span>
                        </div>
                        <div
                          className={`nodeInnerGroup ${
                            selectedCompanyIndex === companyIndex ? "open" : ""
                          }`}
                        >
                          {departments.map((department, departmentIndex) => {
                            if (department.t_organization_no === null) {
                              return null; // null을 반환하여 해당 div를 출력하지 않음
                            }

                            return (
                              <div
                                className="departmentItem"
                                key={departmentIndex}
                                onClick={() =>
                                  handleItemClick(
                                    department.t_organization_name,
                                    department.t_organization_no,
                                    0,
                                    selectedListTab,
                                    department.t_company_no
                                  )
                                }
                              >
                                <span className="buildingIcon">
                                  <FolderTwoToneIcon />
                                </span>
                                <span
                                  className={`txtNodeTitle ${
                                    selectedNodePk ===
                                    department.t_organization_no
                                      ? "selectedNodePkBackgroundColor"
                                      : ""
                                  }`}
                                >
                                  <span className="num">
                                    {department.organization_employee_count}
                                  </span>
                                  {department.t_organization_name === "" ? (
                                    <input
                                      type="text"
                                      value={prevEditingOrganizationName}
                                      onKeyDown={(e) =>
                                        handleInputKeyPress(
                                          e,
                                          department.row_index
                                        )
                                      }
                                      onChange={handleInputChange} // input 값 변경 시 실행되는 함수
                                      placeholder="새로운 조직 이름 입력"
                                    />
                                  ) : (
                                    department.t_organization_name
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {loading && (
            <div className="overlay-loading-box text-center">
        
          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">불러오는 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
          </div>
        </BasicTreeViewDepth>
        <BasicListTabs
          selectedListTab={selectedListTab}
          setSelectedListTab={setSelectedListTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          editingItem={editingItem}
          selectedEmployeeState={selectedEmployeeState}
        />
        <BasicTreeViewList
          showingMyEmployees={showingMyEmployees}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          editingOrganization={editingOrganization}
          selectedListTab={selectedListTab}
          myWorkPlace={myWorkPlace}
          myCompanyInfo={myCompanyInfo}
          fetchData={fetchData}
          selectedCompanyPk={selectedCompanyPk}
          editingItem={editingItem}
          selectedNodePk={selectedNodePk}
          selectedNodeIndex={selectedNodeIndex}
          setLoading={setLoading}
        />
      </WrappedTreeView>
    </CsContainer>
  );
}
export default Management;
