import { styled } from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BasicGridBox from "./BasicGridBox";

const TreeViewList = styled.div`
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 290px;
  right: 34px;
  width: auto;
  transition: right .25s;
  float: right;
  h2{
    font-size: 15px;
    line-height: 22px;
    color: #000;
    vertical-align: top;
    font-weight: bold;
    float: left;
  }
  .buttonBox{
    position: absolute;
    top: 2px;
    right: 0;
  }
  .luxSearchBox{
    margin: 0px;
    padding: 0px;
    width: 250px;
    position: relative;
    display: inline-block;
  }
  .wrappingInput{
    margin: 0px;
    padding: 5px 70px 1px 6px;
    position: relative;
    border: 1px solid rgb(219, 219, 219);
    background: rgb(255, 255, 255);
    height: 27px;
    line-height: 19px;
  }
  .searchInput{
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
  .basicSearchButton{
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
  .registerEmployeeButton{
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
  .tblGridBox{
    border-bottom: 1px solid rgb(225, 225, 225);
    position: absolute;
    top: 32px;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100% - 32px);
  }
`;

function BasicTreeViewList(){
 

  return(
    <TreeViewList>
      <div className="basicTblTit">
        <h2>직원리스트</h2>
        <div className="buttonBox">
          <div className="luxSearchBox">
            <div className="wrappingInput">
              <input type="text" className="searchInput" placeholder="이름, 조직, 유선, 휴대폰 전화번호로 검색" />
              <button type="button" className="basicSearchButton">
                <span className="wrappingIcon">
                  <SearchOutlinedIcon />
                </span>
              </button>
            </div>
          </div>
          <button className="registerEmployeeButton">직원등록</button>
        </div>
      </div>
      <div className="tblGridBox">
        <BasicGridBox />
      </div>
    </TreeViewList>
  );
}export default BasicTreeViewList;