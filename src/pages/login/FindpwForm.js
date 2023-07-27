import React, { useState } from 'react';
import './FindpwForm.css'; // Import FindpwForm.css
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosApi from "../../AxiosApi";


const FindpwForm = () => { // Rename the component to FindpwForm
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState();
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [foundpw, setFoundpw] = useState('');
  const [error, setError] = useState('');
  const [ispwFound, setIspwFound] = useState(false);

  const test = (e) => {
    console.log('hihi');
    console.log({ foundpw });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      let data;

      if (searchOption === 'phone') {
        url = '/findpw2';
        data = { t_user_id: id, t_user_phone: phone };
      } else {
        url = '/findpw1';
        data = { t_user_id: id, t_user_email: email };
      }

      const response = await axiosApi.post(url, data);

      const foundpw = response.data.t_user_password;
      setFoundpw(foundpw);
      setError('');
      setIspwFound(true);

      navigate('/findpwresult', { state: { foundpw } }); // Redirect to the password reset result page
    } catch (error) {
      console.error(error);
      setError('등록된 정보와 일치하지 않습니다');
      setFoundpw('');
      setIspwFound(false);
    }
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="find-pw-container"> {/* Use the class name from FindpwForm.css */}
      <form className="find-pw-form" onSubmit={handleSubmit}> {/* Use the class name from FindpwForm.css */}
        <div className="find-pw-title">비밀번호 찾기</div> {/* Use the class name from FindpwForm.css */}
        <div className="find-pw-description">WEHAGO에 등록된 회원정보로 비밀번호를 찾으실 수 있습니다.</div> {/* Use the class name from FindpwForm.css */}
        <div className="find-pw-search-option"> {/* Use the class name from FindpwForm.css */}
          <div className="find-pw-option"> {/* Use the class name from FindpwForm.css */}
            <input
              type="radio"
              id="phone-option"
              value="phone"
              checked={searchOption === 'phone'}
              onChange={handleSearchOptionChange}
            />
            <label htmlFor="phone-option">휴대폰 번호로 찾기</label>
          </div>
          <div className="find-pw-option"> {/* Use the class name from FindpwForm.css */}
            <input
              type="radio"
              id="email-option"
              value="email"
              checked={searchOption === 'email'}
              onChange={handleSearchOptionChange}
            />
            <label htmlFor="email-option">이메일로 찾기</label>
          </div>
        </div>
        <div className="find-pw-form-group"> {/* Use the class name from FindpwForm.css */}
          <label className="find-pw-form-label" htmlFor="name">아이디</label> {/* Use the class name from FindpwForm.css */}
          <input
            className="find-pw-form-input"  
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        {searchOption === 'email' && (
          <div className="find-pw-form-group"> 
            <label className="find-pw-form-label" htmlFor="email">이메일</label> {/* Use the class name from FindpwForm.css */}
            <input
              className="find-pw-form-input"  
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        {searchOption === 'phone' && (
          <div className="find-pw-form-group"> 
            <label className="find-pw-form-label" htmlFor="phone">휴대폰 번호</label> 
            <input
              className="find-pw-form-input"  
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        )}
        <button className="find-pw-form-button" type="submit" onClick={test}>비밀번호 찾기</button> {/* Use the class name from FindpwForm.css */}
        <Link to="/findid" className="find-pw-link">아이디 찾기</Link> {/* Use the class name from FindpwForm.css */}
      </form>
      {error && (
        <div className="find-pw-error"> {/* Use the class name from FindpwForm.css */}
          {error}
        </div>
      )}
    </div>
  );
};

export default FindpwForm; // Export the component as FindpwForm
