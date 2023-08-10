import { styled } from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const StyledDiv1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  position: relative; /* 배경 이미지와 내용을 겹치게 하기 위해 추가 */
  z-index: 1; /* 내용을 배경 이미지 위로 표시하기 위해 추가 */
`;


const LogoImage1 = styled.img`
  height: 100%;
  object-fit: contain;
  margin-left: 20px;
  margin-top: 25px;
`;

const StyledLink1 = styled(Link)`
  text-decoration: none;
  color: white;
`;

const BannerContainer1 = styled.div`
  position: relative;
`;

const BannerBackground1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("your-image-url-here"); /* 배경 이미지 추가 */
  background-size: cover;
  opacity: 0.5; /* 배경 이미지의 투명도 설정 */
`;


function SignUpHeader1() {
  return (
    <div>
      <BannerContainer1>
        <BannerBackground1 />
        <div className="text-start" style={{ backgroundColor: "black", height: "80px" }}>
          <StyledDiv1 className="">
            <div style={{ height: "24px" }}>
              <StyledLink1 to="/">
                <LogoImage1 src="https://static.wehago.com/imgs/common/wehago_w.svg" alt="Logo" />
              </StyledLink1>
            </div>
            <div className="" style={{ float: "right", color: "white", fontSize: "18px", marginRight: "20px" }}>
              <StyledLink1 to ="/">
                <span className="px-3">서비스 소개</span>
              </StyledLink1>
              <StyledLink1 to="/login">
                <span className="px-3">로그인</span>
              </StyledLink1>
            </div>
          </StyledDiv1>
        </div>
      </BannerContainer1>
    </div>
  );
}

export default SignUpHeader1;
