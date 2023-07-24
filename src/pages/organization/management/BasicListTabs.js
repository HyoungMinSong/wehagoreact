import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ListTabs = styled.div`
  position: absolute;
  top: 0px;
  left: 290px;
  right: 34px;
  border-bottom: 1px solid #9e9e9e;
  text-align: center;
  .basicTabsIn {
    vertical-align: top;
  }
  .basicTabsUl {
    font-size: 13px;
    vertical-align: top;
    zoom: 1;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .basicTabsLiSelected {
    font-size: 15px;
    line-height: 32px;
    border-bottom: 3px solid rgb(0, 162, 255);
    display: block;
    cursor: pointer;
    width: 20%;
    float: left;
  }
  .basicTabsLiNot {
    font-size: 15px;
    line-height: 32px;
    border-bottom: 3px solid transparent;
    display: block;
    cursor: pointer;
    width: 20%;
    float: left;
  }
  .num {
    color: rgb(28, 144, 251);
    margin-left: 10px;
    font-size: 15px;
    line-height: 18px;
    -webkit-margin-before: 1px;
  }
`;

function BasicListTabs(props) {
  // 선택한 리스트 탭의 인덱스를 저장할 state
  const [selectedListTab, setSelectedListTab] = useState(props.selectedListTab);
  

  // 리스트 탭 상태 전송
  useEffect(() => {
    props.setSelectedListTab(selectedListTab);
  }, [selectedListTab]);
  useEffect(() =>{
    setSelectedListTab(props.selectedListTab);
  }, [props.selectedListTab])

  // 커서 정보 저장
  const handleListTabClick = (index) => {
    setSelectedListTab(index);
    if (props.isExpanded === "true") {
      props.setIsExpanded("false");
    }
  };

  return (
    <div>
      <ListTabs>
        <div className="basicTabsIn">
          <ul className="basicTabsUl">
            <li
              className={`${
                selectedListTab === -1
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(-1)}
            >
              <span>
                전체
                <span className="num">{props.selectedEmployeeState.count_state_all}</span>
              </span>
            </li>
            <li
              className={`${
                selectedListTab === 0 ? "basicTabsLiSelected" : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(0)}
            >
              <span>
                미가입
                <span className="num">{props.selectedEmployeeState.count_state_0}</span>
              </span>
            </li>
            <li
              className={`${
                selectedListTab === 1 ? "basicTabsLiSelected" : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(1)}
            >
              <span>
                가입대기
                <span className="num">{props.selectedEmployeeState.count_state_1}</span>
              </span>
            </li>
            <li
              className={`${
                selectedListTab === 2 ? "basicTabsLiSelected" : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(2)}
            >
              <span>
                사용중
                <span className="num">{props.selectedEmployeeState.count_state_2}</span>
              </span>
            </li>
            <li
              className={`${
                selectedListTab === 3 ? "basicTabsLiSelected" : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(3)}
            >
              <span>
                사용중지
                <span className="num">{props.selectedEmployeeState.count_state_3}</span>
              </span>
            </li>
          </ul>
        </div>
      </ListTabs>
    </div>
  );
}
export default BasicListTabs;
