import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from "../../AxiosApi";
import './LoginInvite';
import { Spinner } from "react-bootstrap";


function LoginRedirect() {
  const { shortLink } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.get("/l/" + shortLink)
      .then((response) => {
        setLoading(false);
        if (response.data === '') {
          console.log('백엔드 오류 리턴');
          navigate('/alert');
        } else {
          console.log(response.data);
          const empNo = response.data.empNo;
          navigate('/Logininvite',{state:{empNo}});     
        }
      })
      .catch(() => {
        console.log('실패함');
        setLoading(false);
        navigate('/alert');
      });
  }, [navigate, shortLink]);

 
    return (
      <div>
        {loading && (
            <div className="overlay-loading-box text-center"  style={{ backgroundColor: 'white', color: 'black' }}>
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
                <div className="mt-3">로딩중입니다<br />잠시만 기다려주세요.</div>
            </div>)}
      </div>
    );
  


}

export default LoginRedirect;
