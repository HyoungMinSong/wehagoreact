import React from 'react';
import './FindpwResult.css'; // Import FindpwResult.css
import PortraitIcon from '@mui/icons-material/Portrait';
import { Link, useLocation } from 'react-router-dom';
import './FindpwForm.js'; // Import the FindpwForm component

const FindpwResult = () => { // Rename the component to FindpwResult
  const location = useLocation(); // useLocation hook 추가
  const { foundpw } = location.state || {};
  // 콘솔에 출력
  console.log('Found PW:', { foundpw });

  return (
    <div className="find-pw-result-container"> {/* Use the class name from FindpwResult.css */}
      <div className="find-pw-result-wrapper"> {/* Use the class name from FindpwResult.css */}
        <h2 className="find-pw-result-title"> {/* Use the class name from FindpwResult.css */}
          <PortraitIcon fontSize='large' /> 비밀번호 확인 {/* Use the class name from FindpwResult.css */}
        </h2>
        <h6 className="find-pw-result-title2">찾으신 회원님의 비밀번호를 확인하세요.</h6> {/* Use the class name from FindpwResult.css */}
        <div className="find-pw-result-content"> {/* Use the class name from FindpwResult.css */}
          <p className="find-pw-result-message">회원님의 비밀번호는</p> {/* Use the class name from FindpwResult.css */}
          <p className="find-pw-result-id">{foundpw}</p> {/* foundId를 직접 출력 */}
          <div className="find-pw-result-note"> {/* Use the class name from FindpwResult.css */}
            <p>가입 시 입력하신 정보는 로그인 후 [개인설정]에서 확인하실 수 있습니다.</p>
          </div>
          <Link to="/login" className="find-pw-result-login-button"> {/* Use the class name from FindpwResult.css */}
            로그인
          </Link>
          <Link to="/Updatepw" className="find-pw-result-updatepw-button">
            비밀번호 변경
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindpwResult; // Export the component as FindpwResult
