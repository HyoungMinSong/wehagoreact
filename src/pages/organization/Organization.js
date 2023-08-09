import { Link, Outlet, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import ActionFooter from "./ActionFooter";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setService, setCompany, setCompanyName } from '../../store'
import Header from "../main/HeaderComponent/Header";

const SectionTag = styled.div`
    display:block;
    margin: 0px auto;
    background-color: white;
    text-align: center;
    position: absolute;
    min-width: 1240px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .organizationSectionContainerX{
      position: absolute;
      top: 118px;
      bottom: 0;
      left: 20px;
      right: 20px;
      transition: bottom 0.4s;
    }
    .organizationSectionContainerO{
      position: absolute;
      top: 118px;
      bottom: 44px;
      left: 20px;
      right: 20px;
      transition: bottom 0.4s;
    }
`;
const SubHeader = styled.div`
    height: 48px;
    padding: 0 20px;
    background: #1c90fb;
    h1{
        float: left;
        font-size: 20px;
        line-height: 48px;
        font-weight: 300;
        color: #fff;
        vertical-align: top;
        margin: 0;
        padding: 0;
        margin-left: 32px;
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

function Organization() {

  const dataOfTheChosenOnes = useSelector(state => state.areThereAnyChosenOnes);
  const { user, service, company, companyName } = useSelector((state) => state.loginUserData);

  return(
    <SectionTag>
      <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
      <SubHeader>
        <h1>조직도</h1>
        <div className="organizationHeaderButton">
          <div className="tabsIn">
            <ul className="tabsListUl">
              <li className="tabsListLi">
                <Link to={'/organization/management'}><h2>조직관리</h2></Link>
              </li>
              <li className="tabsListLi">
                <Link to={'/organization/services'}><h2>서비스관리</h2></Link>
              </li>
            </ul>
          </div>
        </div>
      </SubHeader>
      <div className={dataOfTheChosenOnes.checkedEmployee && dataOfTheChosenOnes.checkedEmployee.length>0 ? "organizationSectionContainerO":"organizationSectionContainerX"} >
        <Outlet />
      </div>
      <ActionFooter />
    </SectionTag>
  );
}export default Organization;