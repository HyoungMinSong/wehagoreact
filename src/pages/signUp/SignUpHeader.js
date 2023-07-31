import { styled } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
const StyledDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const LogoImage = styled.img`
  height: 100%; /* 이미지가 부모 요소인 div의 높이에 맞게 조절됨 */
  object-fit: contain; /* 이미지가 비율을 유지하면서 div에 맞게 들어가도록 조절됨 */
  margin-left: 20px; /* 이미지 왼쪽에 여백 추가 */
  margin-top: 25px; /* 이미지를 수직으로 가운데 정렬하기 위한 높이 설정 */
  
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 없애기 */
  color: white; /* 링크 색깔을 흰색으로 설정 */
`;


// className="border-danger"
function SignUpHeader() {
    
  return (

    <div>
        <div className="text-start " style={{backgroundColor: "#333948", height: "80px"}}>
        <StyledDiv className="">
            <div style={{height: "24px"}}><StyledLink to ="/">
            <LogoImage src="https://static.wehago.com/imgs/common/wehago_w.svg" alt="Logo"/></StyledLink>
            </div>
            <div className=""style={{ float: 'right',color: 'white', fontSize: '18px', marginRight: '20px'}}>
                <span className="px-3">서비스 소개</span>
                <StyledLink to ="/login">
                <span className="px-3">로그인</span></StyledLink>
            </div>
            
          </StyledDiv>
        </div>
    </div>
    
  );
}

export default SignUpHeader;