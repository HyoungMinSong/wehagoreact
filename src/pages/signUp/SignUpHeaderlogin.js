import { styled } from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const StyledDiv2 = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
`;

const LogoImage2 = styled.img`
  height: 100%;
  object-fit: contain;
  margin-left: 20px;
  margin-top: 25px;
`;

const StyledLink2 = styled(Link)`
  text-decoration: none;
  color: white;
`;

function SignUpHeader2() {
  return (
    <div>
      <div
        className="text-start"
        style={{
          backgroundColor: "rgba(51, 57, 72, 0.3)", // 투명한 배경색 설정
          height: "80px"
        }}
      >
        <StyledDiv2>
          <div style={{ height: "24px" }}>
            <StyledLink2 to="/">
              <LogoImage2 src="https://static.wehago.com/imgs/common/wehago_w.svg" alt="Logo" />
            </StyledLink2>
          </div>
          <div className="" style={{ float: "right", color: "white", fontSize: "18px", marginRight: "20px" }}>
            <span className="px-3">서비스 소개</span>
            <StyledLink2 to="/signup">
              <span className="px-3">회원가입</span>
            </StyledLink2>
          </div>
        </StyledDiv2>
      </div>
    </div>
  );
}

export default SignUpHeader2;
