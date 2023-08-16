import { styled } from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BasicGridBox from "./BasicGridBox";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const TreeViewList = styled.div`
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 290px;
  right: 34px;
  width: auto;
  transition: right 0.25s;
  float: right;
  h2 {
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
    font-weight: bold;
    float: left;
  }
  .buttonBox {
    position: absolute;
    top: 2px;
    right: 0;
  }
  .luxSearchBox {
    margin: 0px;
    padding: 0px;
    width: 250px;
    position: relative;
    display: inline-block;
  }
  .wrappingInput {
    margin: 0px;
    padding: 5px 70px 1px 6px;
    position: relative;
    border: 1px solid rgb(219, 219, 219);
    background: rgb(255, 255, 255);
    height: 27px;
    line-height: 19px;
  }
  .searchInput {
    margin: 0px;
    padding: 0px;
    display: block;
    font-size: 12px;
    font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
    color: rgb(26, 26, 26);
    letter-spacing: -0.5px;
    vertical-align: top;
    border: 0px none;
    background: transparent;
    outline: none;
    width: 215px;
    writing-mode: horizontal-tb !important;
  }
  .basicSearchButton {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: absolute;
    text-align: center;
    vertical-align: top;
    border-radius: 0px;
    border-width: 0px 0px 0px 1px;
    border-style: none none none solid;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: rgb(219, 219, 219);
    border-image: initial;
    background: rgb(237, 247, 255);
    color: rgb(74, 74, 74);
    text-decoration: none;
    font-family: "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
    font-size: 12px;
    height: 25px;
    letter-spacing: -0.5px;
    line-height: initial;
    padding: 0px;
    width: 27px;
    margin: 0px;
    top: 0px;
    right: 0px;
  }
  .registerEmployeeButton {
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
  .tblGridBox {
    border-bottom: 1px solid rgb(225, 225, 225);
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100% - 32px);
  }
`;

function BasicTreeViewList(props) {
  // 업데이트 할 유저 정보
  const [updateSelectedUser, setUpdateSelectedUser] = useState([]);
  // Date 형식 변환
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 직원등록 On/Off
  const [operateRegisMode, setOperateRegisMode] = useState(false);
  // 기본 이미지
  const [showMyThumbnail, setShowMyThumbnail] = useState(
    "https://static.wehago.com/imgs/dummy/@dummy_02.jpg"
  );
  // 스크롤 참조
  const scrollRef = useRef(null);
  // 로그인 유저 정보
  const loginedUser = useSelector((state) => state.loginUserData);
  // 검색 input
  const [searchInput, setSearchInput] = useState("");
  // 검색어
  const [searchInputText, setSearchInputText] = useState('');
  // 검색결과
  const [searchEmployeeList, setSearchEmployeeList]  = useState([]);
  

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    // 검색 입력값에 따라 employeeList를 필터링합니다.
    if(searchInput === ""){
      
    }else{
      const filteredEmployeeList = props.employeeList.filter((user) => {
        const { t_user_name, t_organization_name, t_user_email, t_user_phone } = user;
        return (
          t_user_name.includes(searchInput) ||
          t_organization_name.includes(searchInput) ||
          t_user_email.includes(searchInput) ||
          t_user_phone.includes(searchInput)
          );
        });
        // 필터링된 employeeList를 BasicGridBox로 전달합니다.
        setSearchInputText(searchInput);
        props.setSearchMode(true);
        setSearchEmployeeList(filteredEmployeeList);
      }
    };
      
      // 직원 등록 클릭 이벤트
  const handleRegistrationClick = () => {
    setSelectedDate(new Date());
    setUpdateSelectedUser({
      t_company_no: props.tCompanyNo,
      t_organization_name: loginedUser.companyName,
      t_organization_no: -1,
      t_employee_auth: 2,
    });
    setOperateRegisMode(true);
    setShowMyThumbnail("https://static.wehago.com/imgs/dummy/@dummy_02.jpg");
    props.setIsExpanded("true");
    // 페이지를 최상단으로 스크롤
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <TreeViewList>
      <div className="basicTblTit">
        {props.searchMode ? (
          <h2>검색 결과 [{searchEmployeeList.length}건]</h2>
        ) : (<h2>직원리스트</h2>)}
        <div className="buttonBox">
          <div className="luxSearchBox">
            <div className="wrappingInput">
              <input
                type="text"
                className="searchInput"
                onChange={handleSearchInputChange}
                placeholder="이름, 조직, 이메일, 휴대전화번호로 검색"
              />
              <button type="button" className="basicSearchButton" onClick={handleSearchButtonClick}>
                <span className="wrappingIcon">
                  <SearchOutlinedIcon />
                </span>
              </button>
            </div>
          </div>
          <button
            className="registerEmployeeButton"
            onClick={handleRegistrationClick}
          >
            직원등록
          </button>
        </div>
      </div>
      <div className="tblGridBox">
        <BasicGridBox
          employeeList={props.employeeList}
          searchEmployeeList={searchEmployeeList}
          searchMode={props.searchMode}
          organizationList={props.organizationList}
          scrollRef={scrollRef}
          selectedOrgaName={props.selectedOrgaName}
          isExpanded={props.isExpanded}
          setIsExpanded={props.setIsExpanded}
          editingOrganization={props.editingOrganization}
          selectedListTab={props.selectedListTab}
          updateSelectedUser={updateSelectedUser}
          setUpdateSelectedUser={setUpdateSelectedUser}
          operateRegisMode={operateRegisMode}
          setOperateRegisMode={setOperateRegisMode}
          showMyThumbnail={showMyThumbnail}
          setShowMyThumbnail={setShowMyThumbnail}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          fetchEmployeeList={props.fetchEmployeeList}
          setLoading={props.setLoading}
          searchInputText={searchInputText}
        />
      </div>
    </TreeViewList>
  );
}
export default BasicTreeViewList;
