import { useState } from "react";
import axiosApi from "../../AxiosApi";


// className="border-danger"
function SendTest() {
    let [loading, setLoading] = useState(false);

  return (

    <div>
        <button onClick={()=>{
axiosApi.post("/testmail", {
    
  }).then((c) => {
    
  }).catch(() => {
    console.log('실패함')
        })}}>
전송테스트
        </button>
     
    </div>
    
  );
}

export default SendTest;