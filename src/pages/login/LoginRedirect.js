import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from "../../AxiosApi";
import './LoginInvite';


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
          const abc = response.data.empNo;
          navigate('/Logininvite');     
        }
      })
      .catch(() => {
        console.log('실패함');
        setLoading(false);
        navigate('/alert');
      });
  }, [navigate, shortLink]);

  if (loading) {
    return (
      <div>
        로딩 중...
      </div>
    );
  }


}

export default LoginRedirect;
