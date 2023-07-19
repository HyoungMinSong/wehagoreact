import { Link, Outlet, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

const SectionTag = styled.div`
    display:block;
    margin: 0px auto;
    background-color: white;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
const SubHeader = styled.div`
    height: 48px;
    padding: 0 20px;
    background: #1c90fb;
    h1{
        float: left;
        font-size: 18px;
        line-height: 48px;
        font-weight: 300;
        color: #fff;
        vertical-align: top;
        margin: 0;
        padding: 0;
    }
    h2{
      font-size: 15px;
      line-height: 48px;
      font-weight: 300;
      color: #fff;
      vertical-align: top;
      margin: 0;
      padding: 0;
    }
    .organizationHeaderButton{
      float: right;
      text-align: right;
    }
    .tabsIn{
      display: inline-block;
      vertical-align: top;
    }
    .tabsListUl{
      font-size: 13px;
      vertical-align: top;
      zoom: 1;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tabsListLi{
      max-width: 180px;
      display: inline-block;
      float: left;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a{
      display: flex;
      align-items: center;
      float: left;
      height: 48px;
      padding: 0 30px;
      font-weight: 200;
      font-size: 14px;
      line-height: 48px;
      color: #cbe5ff;
      text-align: center;
      text-decoration: none;
      vertical-align: top;
    }
`;
const SectionContainer = styled.div`
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    .ogContentClearfix{
        overflow-y: auto;
        position: absolute;
        top: 48px;
        bottom: 0;
        left: 200px;
        right: 0;
        width: auto;
        padding: 24px 20px 10px;
    }
`;

function Organization() {


  return(
    <SectionTag>
      <SubHeader>
        <h1>조직도</h1>
        <div className="organizationHeaderButton">
          <div className="tabsIn">
            <ul className="tabsListUl">
              <li className="tabsListLi">
                <Link to={'/organization/management'}><h2>조직관리</h2></Link>
              </li>
              <li className="tabsListLi">
                <Link to={'/organization/administrator'}><h2>관리자설정</h2></Link>
              </li>
              <li className="tabsListLi">
                <Link to={'/organization/services'}><h2>서비스관리</h2></Link>
              </li>
            </ul>
          </div>
        </div>
      </SubHeader>
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </SectionTag>
  );
}export default Organization;