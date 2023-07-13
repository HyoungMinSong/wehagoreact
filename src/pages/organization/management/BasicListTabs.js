import { styled } from "styled-components";

const ListTabs = styled.div`
  position: absolute;
  top: 0px;
  left: 290px;
  right: 34px;
  border-bottom: 1px solid #9e9e9e;
  text-align: center;
  .basicTabsIn{
    vertical-align: top;
  }
  .basicTabsUl{
    font-size: 13px;
    vertical-align: top;
    zoom: 1;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .basicTabsLiSelected{
    font-size: 15px;
    line-height: 32px;
    border-bottom: 3px solid rgb(0, 162, 255);
    display: block;
    cursor: pointer;
    width: 20%;
    float: left;
  }
  .basicTabsLiNot{
    font-size: 15px;
    line-height: 32px;
    border-bottom: 3px solid transparent;
    display: block;
    cursor: pointer;
    width: 20%;
    float: left;
  }
  .num{
    color: rgb(28, 144, 251);
    margin-left: 10px;
    font-size: 15px;
    line-height: 18px;
    -webkit-margin-before: 1px;
}
`;

function BasicListTabs() {

  return(
    <div>
      <ListTabs>
        <div className="basicTabsIn">
          <ul className="basicTabsUl">
            <li className="basicTabsLiSelected">
              <span>
                전체
                <span className="num">10</span>
              </span>
            </li>
            <li className="basicTabsLiNot">
              <span>
                미가입
                <span className="num">0</span>
              </span>
            </li>
            <li className="basicTabsLiNot">
              <span>
                가입대기
                <span className="num">0</span>
              </span>
            </li>
            <li className="basicTabsLiNot">
              <span>
                사용중
                <span className="num">10</span>
              </span>
            </li>
            <li className="basicTabsLiNot">
              <span>
                사용중지
                <span className="num">0</span>
              </span>
            </li>
          </ul>
        </div>
      </ListTabs>
    </div>
  );
}export default BasicListTabs;