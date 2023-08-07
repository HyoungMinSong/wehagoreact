import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import axiosApi from "../../AxiosApi";

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

    if (loading) {
      return (
        <div>
          로딩 중...
        </div>
      );
    }
  
}

export default SignUpRedirect;