import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import axiosApi from "../../AxiosApi";
import { Spinner } from "react-bootstrap";
// className="border-danger"


function SignUpRedirect() {
    const [loading, setLoading] = useState(true);
    let {shortLink} = useParams();
    let navigate = useNavigate();
    console.log(shortLink)
    axiosApi.get("/s/"+shortLink).then((c) => {
        if (c.data === '') {
        //   handleShow();
        console.log('백엔드오류리턴')
        navigate('/alert');
        } else {
          console.log(c.data);
          let abc= c.data.empNo;
          navigate(c.data.shortLink, { state: {abc}  })
        }
        console.log(c.data);

      }).catch(() => {
        console.log('실패함')
        setLoading(false);
        navigate('/alert');
      })
    //   .finally(() => {
    //     setLoading(false);
    //   })

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
  


export default SignUpRedirect;