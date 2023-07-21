import React, { useState } from 'react';
import './FindIdForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosApi from "../../AxiosApi";


const FindIdForm = () => {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [foundId, setFoundId] = useState('');
  const [error, setError] = useState('');
  const [isIdFound, setIsIdFound] = useState(false); // Add a state variable to track whether the ID is found
  const test = (e) =>{
    console.log('hihi')
    console.log({foundId})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      let data;

      if (searchOption === 'phone') {
        url = '/findid2';
        data = { t_user_name: name, t_user_phone: phone };
      } else {
        url = '/findid1';
        data = { t_user_name: name, t_user_email: email };
      }

      const response = await axiosApi.post(url, data);

      const foundId = response.data.t_user_id;
      setFoundId(foundId);
      console.log( ' 1.' + foundId)
      console.log('2.'+response.data.t_user_id )
      setError('');
      setIsIdFound(true);
      console.log( ' 3.' + foundId)

      navigate('/findIdresult' , { state: {foundId}  }); // 로그인이 성공하면 /findIdresult 페이지로 이동합니다.
      console.log( ' 4.' + foundId)
    } catch (error) {
      console.error(error);
      setError('등록된 정보와 일치하지 않습니다');
      setFoundId('');
      setIsIdFound(false);
    }
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="find-id-container">
      <form className="find-id-form" onSubmit={handleSubmit}>
        <div className="find-id-title">아이디 찾기</div>
        <div className="find-id-description">WEHAGO에 등록된 회원정보로 아이디를 찾으실 수 있습니다.</div>
        <div className="find-id-search-option">
          <div className="find-id-option">
            <input
              type="radio"
              id="phone-option"
              value="phone"
              checked={searchOption === 'phone'}
              onChange={handleSearchOptionChange}
            />
            <label htmlFor="phone-option">휴대폰 번호로 찾기</label>
          </div>
          <div className="find-id-option">
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
        <div className="find-id-form-group">
          <label className="find-id-form-label" htmlFor="name">이름</label>
          <input
            className="find-id-form-input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {searchOption === 'email' && (
          <div className="find-id-form-group">
            <label className="find-id-form-label" htmlFor="email">이메일</label>
            <input
              className="find-id-form-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        {searchOption === 'phone' && (
          <div className="find-id-form-group">
            <label className="find-id-form-label" htmlFor="phone">휴대폰 번호</label>
            <input
              className="find-id-form-input"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        )}
        <button className="find-id-form-button" type="submit" onClick={test}>Find ID</button>
        <Link to="/findpw" className="find-id-link">비밀번호 찾기</Link>
      </form>
      {error && (
        <div className="find-id-error">
          {error}
        </div>
      )}
      
    </div>
  );
};

export default FindIdForm;
