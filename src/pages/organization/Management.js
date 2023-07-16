import styled from "styled-components";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import BasicTreeViewList from "./management/BasicTreeViewList";
import BasicListTabs from "./management/BasicListTabs";
import { useEffect, useState } from "react";
import axiosApi from "../../AxiosApi";


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
  h2{
    float: left;
    margin-right: 10px;
    font-size: 20px;
    color: #555;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
  }
  p{
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
  .treeViewTit{
    position: relative;
    padding: 5px 0;
  }
  h2{
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
    margin: 0;
    padding: 0;
  }
  .buttonBox{
    position: absolute;
    top: 2px;
    right: 0;
  }
  a{
    padding: 0 10px;
    line-height: 27px;
    height: 27px;
    font-size: 6px;
    letter-spacing: -.5px;
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
  .editOrganizationSaveButton{
    padding: 2px 8px 0;
    margin-top: 5px;
    margin-left: 5px;
    height: 20px;
    font-size: 11px;
    font-family: 돋움,Dotum,Helvetica,Apple SD Gothic Neo,sans-serif!important;
    letter-spacing: -.5px;
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
  .editOrganizationButton{
    padding: 2px 8px 0;
    margin-top: 5px;
    margin-left: 5px;
    height: 20px;
    font-size: 11px;
    font-family: 돋움,Dotum,Helvetica,Apple SD Gothic Neo,sans-serif!important;
    letter-spacing: -.5px;
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
  span{
    line-height: 27px;
    font-size: 12px;
    letter-spacing: -.5px;
    color: #4a4a4a;
    font-weight: 400;
    text-align: center;
  }
  .organizationChartBox{
    position: absolute;
    top: 33px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    border: 1px solid #9e9e9e;
    font-size: 13px;
  }
  .organizationList{
    height: 392px;
    border-bottom: 1px solid #f0f0f0;
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding-bottom: 10px;
    box-sizing: border-box;
    user-select: none !important;
  }
  .chartTree{
    margin-bottom: 0px;
    overflow: visible;
    height: auto;
    position: relative;
  }
  .mTree{
    position: relative;
    user-select: none;
  }
  .nodeInnerCompany{
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
  .nodeInnerGroup{
    position: relative;
    height: auto;
    padding-left: 20px;
    margin-left: 35px;
    border-bottom: 0;
    background: 0 0;
    font-size: 14px;
    line-height: 18px;
    padding: 1px 100px 0 0;
  }
  .buildingIcon{
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
.MuiSvgIcon-root{
    color: #1c90fb;
}
.txtNodeTitle{
    cursor: pointer;
    color: rgb(0, 0, 0);
    padding: 4px 5px;
    max-width: calc(100% - 36px);
    margin-top: -4px;
    letter-spacing: -.3px;
    overflow: hidden;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
}
.num{
    color: rgb(28, 144, 251);
    float: right;
    margin-left: 4px;
    font-size: 12px;
    line-height: 18px;
    -webkit-margin-before: 1px;
}
`;

function Management(){

  // 토큰으로 회원번호
  const [tUserNo, setTUserNo] = useState("1");
  // 회원번호로 회사이름
  const [myCompany, setMyCompany] = useState("위하고");
  // 회원번호로 부서목록
  const [myOrganization, setMyOrganization] = useState([]);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/showMyCompany", {
        params: {
          t_user_no: tUserNo, // tUserNo를 쿼리 파라미터로 전달합니다.
        },
      }); // 데이터베이스로부터 데이터 가져오기
      setMyCompany(response.data); // 데이터 설정
      const response1 = await axiosApi.get("/showMyOrganization", {
        params: {
          t_user_no: tUserNo, // tUserNo를 쿼리 파라미터로 전달합니다.
        },
      }); // 데이터베이스로부터 데이터 가져오기
      setMyOrganization(response1.data); // 데이터 설정
    } catch (error) {
      console.error(error);
    }
  };

  return(
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
              <button className="editOrganizationButton">추가</button>
              <button className="editOrganizationButton">편집</button>
              <button className="editOrganizationButton">삭제</button>
              <button className="editOrganizationButton">취소</button>
              <button className="editOrganizationSaveButton">저장</button>
            </div>
          </div>
          <div className="organizationChartBox">
            <div className="organizationList">
              <div className="chartTree">
                <div className="mTree">
                  <div className="mNode">
                    <div className="nodeInnerCompany">
                      <span className="buildingIcon"><BusinessOutlinedIcon /></span>
                      <span className="txtNodeTitle">
                        <span className="num">10</span>
                        {myCompany}
                      </span>
                    </div>
                    {myOrganization && myOrganization.map((item, index) => (
                      <div className="nodeInnerGroup" key={index}>
                        <span className="buildingIcon"><FolderTwoToneIcon /></span>
                        <span className="txtNodeTitle">
                          <span className="num">4</span>
                          {item ? item : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BasicTreeViewDepth>
        <BasicListTabs />
        <BasicTreeViewList />
      </WrappedTreeView>
    </CsContainer>
  );
}export default Management;

