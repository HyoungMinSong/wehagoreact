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
  // 커서 정보 저장
  const handleListTabClick = (index) => {
    props.setSelectedListTab(index);
    if (props.isExpanded === "true") {
      props.setIsExpanded("false");
    }
  };

  // 상태별 인원수 세기 조직도,직원 변화때
  const countingEmplFromOrga = (state) => {
    if (props.selectedRowNum === 0) {
      if (state === -1) {
        return props.employeeList.length;
      }
      return props.employeeList.filter((emp) => emp.t_employee_state === state)
        .length;
    }
    let orgaName = props.organizationList.find(
      (org) => org.rownum === props.selectedRowNum
    ).t_organization_name;
    if (state === -1) {
      return props.employeeList.filter(
        (emp) => emp.t_organization_name === orgaName
      ).length;
    }
    return props.employeeList.filter(
      (emp) =>
        emp.t_organization_name === orgaName && emp.t_employee_state === state
    ).length;
  };

  return (
    <div>
      <ListTabs>
        <div className="basicTabsIn">
          <ul className="basicTabsUl">
            <li
              className={`${
                props.selectedListTab === -1
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(-1)}
            >
              <span>
                전체
                <span className="num">{countingEmplFromOrga(-1)}</span>
              </span>
            </li>
            <li
              className={`${
                props.selectedListTab === 0
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(0)}
            >
              <span>
                미가입
                <span className="num">{countingEmplFromOrga(0)}</span>
              </span>
            </li>
            <li
              className={`${
                props.selectedListTab === 1
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(1)}
            >
              <span>
                가입대기
                <span className="num">{countingEmplFromOrga(1)}</span>
              </span>
            </li>
            <li
              className={`${
                props.selectedListTab === 2
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(2)}
            >
              <span>
                사용중
                <span className="num">{countingEmplFromOrga(2)}</span>
              </span>
            </li>
            <li
              className={`${
                props.selectedListTab === 3
                  ? "basicTabsLiSelected"
                  : "basicTabsLiNot"
              }`}
              onClick={() => handleListTabClick(3)}
            >
              <span>
                사용중지
                <span className="num">{countingEmplFromOrga(3)}</span>
              </span>
            </li>
          </ul>
        </div>
      </ListTabs>
    </div>
  );
}
export default BasicListTabs;
