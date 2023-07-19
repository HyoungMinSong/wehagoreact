import styled from "styled-components";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import BasicTreeViewList from "./management/BasicTreeViewList";
import BasicListTabs from "./management/BasicListTabs";
import { useEffect, useState } from "react";
import axiosApi from "../../AxiosApi";
import Swal from "sweetalert2";

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
  .mNode > * > .selected {
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
  // 편집중엔 그리드 비활성화할 state

  // 토큰으로 회원번호
  const [tUserNo, setTUserNo] = useState("1");
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
  const [showingMyEmployees, setShowingMyEmployees] = useState({
    t_user_no: "",
    t_user_id: "",
    t_user_password: "",
    t_user_name: "",
    t_user_phone: "",
    t_user_email: "",
    t_user_photo_name: "",
    t_user_photo_path: "",
    t_user_sign_date: "",
    t_user_delete_date: "",
    t_user_state: "",
    t_user_update_date: "",
  });
  // Detail 오프너
  const [isExpanded, setIsExpanded] = useState("false");

  // 아코디언 오프너
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState([]);

  // 아코디언 오프너 버튼
  const handleCompanyClick = (companyIndex) => {
    setSelectedCompanyIndex(
      companyIndex === selectedCompanyIndex ? -1 : companyIndex
    );
  };

  // 2번째 파라미터로 빈 배열 배치시 렌더링하는 처음만 실행
  useEffect(() => {
    fetchData();
  }, []);

  // 선택 값에 따라 그리드 갱신
  useEffect(() => {
    if (
      editingItem != null &&
      selectedNodePk != null &&
      selectedNodeIndex != null &&
      selectedListTab != null
    ) {
      showMyEmployees(editingItem, selectedNodePk, selectedNodeIndex, selectedListTab);
    }
  }, [editingItem, selectedNodePk, selectedNodeIndex, selectedListTab]);

  // 첫 렌더링에 가져올 값
  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/showMyWorkPlace", {
        params: {
          t_user_no: tUserNo,
        },
      });
      console.log(response.data);
      setMyWorkPlace(response.data);
      setSelectedCompanyIndex(0);
      setEditingItem(response.data[0].t_company_name);
      setSelectedNodePk(response.data[0].t_company_no);
    } catch (error) {
      console.error(error);
    }
  };

  // 수정, 취소, 저장 버튼 클릭
  const handleEditClick = (e) => {
    if (e.target.name == "EditB") {
      setEditingOrganization(true);
    } else {
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

  // 추가, 편집, 삭제 버튼 클릭
  const handleCrudClick = (e) => {
    // if (e.target.name === "CreateB") {
    //   setMyOrganization([...myOrganization, ""]);
    // }
  };

  // 조직도 클릭 이벤트
  const handleItemClick = (name, pk, index, listTab) => {
    if (isExpanded === "true") {
      setIsExpanded("false");
    }
    console.log(name, index, listTab);
    setSelectedNodeIndex(listTab);
    setEditingItem(name);
    setSelectedNodeIndex(index);
    setSelectedNodePk(pk);
  };

  // 직원 리스트 Select
  const showMyEmployees = (item, pk, index, list) => {
    try {
      const response = axiosApi
        .get("/showMyEmployees", {
          params: {
            nodeName: item,
            pk: pk,
            index: index,
            t_employee_state: list,
          },
        })
        .then((res) => {
          setShowingMyEmployees(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 저장 버튼 클릭
  const handleEditSave = () => {
    // if (editingItem && inputRef.current) {
    //   // 수정된 내용을 저장
    //   const editedOrganization = myOrganization.map((item) =>
    //     item === editingItem ? inputRef.current.value : item
    //   );
    //   setMyOrganization(editedOrganization);
    //   setEditingOrganization(false); // 편집 모드 비활성화
    // }
  };

  // select 한 배열에서 회사의 중복된 열 없도록 회사 목록만 추출
  const uniqueCompanies = Array.from(
    new Set(myWorkPlace.map((company) => company.t_company_name))
  ).map((companyName) => {
    const company = myWorkPlace.find((c) => c.t_company_name === companyName);
    return {
      t_company_name: company.t_company_name,
      t_company_no: company.t_company_no
    };
  });

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
                    onClick={handleCrudClick}
                  >
                    추가
                  </button>
                  <button
                    className="editOrganizationButton"
                    name="UpdateB"
                    onClick={handleCrudClick}
                  >
                    편집
                  </button>
                  <button
                    className="editOrganizationButton"
                    name="DeleteB"
                    onClick={handleCrudClick}
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
                    onClick={handleEditClick}
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
                    수정
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="organizationChartBox">
            <div className="organizationList">
              <div className="chartTree">
                <div className="mTree">
                  {uniqueCompanies.map((companyName, companyIndex) => {
                    const departments = myWorkPlace.filter(
                      (company) => company.t_company_name === companyName.t_company_name
                    );
                    console.log(departments);
                    return (
                      <div className="mNode" key={companyIndex}>
                        <div
                          className={`accordionButton ${
                            selectedCompanyIndex === companyIndex ? "open" : ""
                          }`}
                          onClick={() => handleItemClick(companyName.t_company_name, companyName.t_company_no, -1, selectedListTab)}
                        >
                          <span className="accordionIcon" onClick={() => handleCompanyClick(companyIndex)}>
                            {selectedCompanyIndex === companyIndex
                              ? "＞"
                              : "＞"}
                          </span>
                          <span className="buildingIcon">
                            <BusinessOutlinedIcon />
                          </span>
                          <span className="txtNodeTitle">{companyName.t_company_name}</span>
                        </div>
                        <div
                          className={`nodeInnerGroup ${
                            selectedCompanyIndex === companyIndex ? "open" : ""
                          }`}
                        >
                          {departments.map((department, departmentIndex) => (
                            <div
                              className="departmentItem"
                              key={departmentIndex}
                              onClick={() => handleItemClick(department.t_organization_name, department.t_organization_no, 0, selectedListTab)}
                            >
                              <span className="buildingIcon">
                                <FolderTwoToneIcon />
                              </span>
                              <span className="txtNodeTitle">
                                {department.t_organization_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </BasicTreeViewDepth>
        <BasicListTabs
          selectedListTab={selectedListTab}
          setSelectedListTab={setSelectedListTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          editingItem={editingItem}
        />
        <BasicTreeViewList
          showingMyEmployees={showingMyEmployees}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </WrappedTreeView>
    </CsContainer>
  );
}
export default Management;
