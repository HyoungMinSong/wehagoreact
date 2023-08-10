import { styled } from "styled-components";


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

function Administrator() {

  return(
    <div>
      <CsContainer>
        <CsSubTitle>
          <div>
            <h2>공지사항 관리</h2>
            <p>등록된 회사의 공지사항을 관리할 수 있습니다.</p>
          </div>
        </CsSubTitle>
      </CsContainer>  
    </div>
  );

}export default Administrator;
