import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import axiosApi from "../../AxiosApi";

// className="border-danger"
function SignUpRedirect() {
    let {shortLink} = useParams();
    let navigate = useNavigate();
    console.log(shortLink)
    axiosApi.get("/s/"+shortLink).then((c) => {
        if (c.data === "오류") {
        //   handleShow();
        console.log('백엔드오류리턴')
        } else {
          navigate(c.date)
        }
        console.log(c.data);

      }).catch(() => {
        console.log('실패함')
      })
    //   .finally(() => {
    //     setLoading(false);
    //   })

  return (

    <div>
        shortLinkRedirect
    </div>
    
  );
}

export default SignUpRedirect;