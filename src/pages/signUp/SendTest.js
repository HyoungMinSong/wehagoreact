import { useState } from "react";
import axiosApi from "../../AxiosApi";


// className="border-danger"
function SendTest() {
  let [loading, setLoading] = useState(false);
  const emailSubmitHandler = async (event) => {
    event.preventDefault();

    const email = event.target.elements.email.value;
    console.log(email);

    const response = await axiosApi.post('/testmail', {
        email: email
    });

    if(response.status == 200) {
      console.log(response.data);
    } else {
      console.log('Axios Error');
    }
  }
  

  return (
    <form onSubmit={emailSubmitHandler}>
      <input type="email" name="email"/>
      <button type="submit">전송테스트</button>
    </form>
    
  );
}

export default SendTest;