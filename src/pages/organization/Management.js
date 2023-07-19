import styled from "styled-components";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import BasicTreeViewList from "./management/BasicTreeViewList";
import BasicListTabs from "./management/BasicListTabs";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosApi from "../../AxiosApi";
import Swal from "sweetalert2";
import { async } from "q";

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

const myCompanies = [
  {
    name: '회사1',
    num: 10,
    departments: [
      { name: '부서1', num: 4 },
      { name: '부서2', num: 2 },
      // ...
    ],
  },
  {
    name: '회사2',
    num: 5,
    departments: [
      { name: '부서A', num: 3 },
      { name: '부서B', num: 1 },
      // ...
    ],
  },
  // ...
];

const jsonData = JSON.stringify(myCompanies);


  // 토큰으로 회원번호
  const [tUserNo, setTUserNo] = useState("1");
  // 회원번호로 회사이름
  const [myCompany, setMyCompany] = useState("위하고");
  // 회원번호로 부서목록
  const [myOrganization, setMyOrganization] = useState([]);
  // 수정 버튼 ON/OFF
  const [editingOrganization, setEditingOrganization] = useState(false);
  // 선택한 요소의 정보 저장
  const [editingItem, setEditingItem] = useState(null);
  // useRef를 통해 수정된 내용을 입력하는 input 요소에 접근
  const inputRef = useRef(null);
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

  // 2번째 파라미터로 빈 배열 배치시 렌더링하는 처음만 실행
  useEffect(() => {
    fetchData();
  }, []);

  // 선택 값에 따라 그리드 갱신
  useEffect(() => {
    if (
      editingItem != null &&
      selectedNodeIndex != null &&
      selectedListTab != null
    ) {
      showMyEmployees(editingItem, selectedNodeIndex, selectedListTab);
    }
  }, [editingItem, selectedNodeIndex, selectedListTab]);

  // 첫 렌더링에 가져올 값
  const fetchData = async () => {
    try {
      // 회사 정보 갱신
      const response = await axiosApi.get("/showMyCompany", {
        params: {
          t_user_no: tUserNo,
        },
      });
      setMyCompany(response.data);
      // 부서 정보 갱신
      const response1 = await axiosApi.get("/showMyOrganization", {
        params: {
          t_user_no: tUserNo,
        },
      });
      setMyOrganization(response1.data);
      // 전체탭선택(기본값)으로 초기화
      setSelectedListTab(-1);
      // 회사선택(기본값)으로 초기화
      handleItemClick(response.data, -1);
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
    if (e.target.name === "CreateB") {
      setMyOrganization([...myOrganization, ""]);
    }
  };

  // 커서 정보 저장
  const handleItemClick = (item, index) => {
    if (isExpanded === "true") {
      setIsExpanded("false");
    }
    console.log(item, index);
    setSelectedNodeIndex(index);
    setEditingItem(item);
  };

  const showMyEmployees = (item, index, list) => {
    try {
      const response = axiosApi
        .get("/showMyEmployees", {
          params: {
            nodeName: item,
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
    if (editingItem && inputRef.current) {
      // 수정된 내용을 저장
      const editedOrganization = myOrganization.map((item) =>
        item === editingItem ? inputRef.current.value : item
      );
      setMyOrganization(editedOrganization);
      setEditingOrganization(false); // 편집 모드 비활성화
    }
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
                  <div className="mNode">
                    <div
                      className="nodeInnerCompany"
                      key="-1"
                      onClick={() =>
                        handleItemClick({ myCompany }.myCompany, -1)
                      }
                    >
                      <span className="buildingIcon">
                        <BusinessOutlinedIcon />
                      </span>
                      <span
                        className={`txtNodeTitle ${
                          -1 === selectedNodeIndex ? "selected" : ""
                        }`}
                      >
                        <span className="num">10</span>
                        {myCompany}
                      </span>
                    </div>
                    {myOrganization &&
                      myOrganization.map((item, index) => (
                        <div
                          className="nodeInnerGroup"
                          key={index}
                          onClick={() => handleItemClick(item, index)}
                        >
                          <span className="buildingIcon">
                            <FolderTwoToneIcon />
                          </span>
                          <span
                            className={`txtNodeTitle ${
                              index === selectedNodeIndex ? "selected" : ""
                            }`}
                          >
                            <span className="num">4</span>
                            {item ? (
                              item
                            ) : (
                              <>
                                <input
                                  type="text"
                                  className="txtNodeTitleInput"
                                />
                              </>
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
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
          selectedNodeIndex={selectedNodeIndex}
          editingItem={editingItem}
          setShowingMyEmployees={setShowingMyEmployees}
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
