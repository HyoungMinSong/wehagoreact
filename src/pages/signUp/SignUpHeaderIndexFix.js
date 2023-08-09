import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 70px;      
    background-color: rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 0;
    z-index:10;
`;

const Area = styled.div`
    display: flex;
    align-items: center;
`;
const StyledLink1 = styled(Link)`
  text-decoration: none;
  color: white;
`;

function SignUpHeaderIndexFix() {

    return(
        <Wrapper>
            <Area>
                <a href="/">
                    <img src="https://static.wehago.com/imgs/common/wehago_w.svg" alt="Logo" width="150px" height="25px"/>
                </a>
            </Area>
            <Area/><Area/>
            <Area>
              <div className="" style={{ float: "right", color: "white", fontSize: "18px", marginRight: "20px" }}>
                <span className="px-3">서비스 소개</span>
                <StyledLink1 to="/login">
                  <span className="px-3">로그인</span>
                </StyledLink1>
              </div>
            </Area>
        </Wrapper>
    );
}

export default SignUpHeaderIndexFix;