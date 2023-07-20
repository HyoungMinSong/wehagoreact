import React, { useState } from 'react';
import './FindIdForm.css';
import { Link } from 'react-router-dom';
import axiosApi from "../../AxiosApi";
import FindIdResult from './FindIdResult'; // Import the FindIdResult component

const FindIdForm = () => {
  const [searchOption, setSearchOption] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [foundId, setFoundId] = useState('');
  const [error, setError] = useState('');
  const [isIdFound, setIsIdFound] = useState(false); // Add a state variable to track whether the ID is found

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

      // 응답 데이터에 찾은 아이디가 포함되어 있다고 가정합니다.
      const foundId = response.data.t_user_id; // 수정: 응답 데이터에서 아이디를 가져오도록 수정
      setFoundId(foundId);
      setError(''); // 에러가 있던 경우 초기화
      setIsIdFound(true); // 아이디를 찾은 경우 상태를 true로 설정하여 FindIdResult 컴포넌트를 표시합니다.
    } catch (error) {
      // 에러 처리
      console.error(error); // 에러를 콘솔에 출력
      setError('서버에서 오류가 발생했습니다. 다시 시도해주세요.'); // 사용자에게 오류 메시지를 표시
      setFoundId(''); // 에러가 발생했을 경우 찾은 아이디 초기화
      setIsIdFound(false); // 아이디를 찾지 못한 경우 상태를 false로 설정하여 FindIdResult 컴포넌트를 숨깁니다.
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
        <button className="find-id-form-button" type="submit">Find ID</button>
        <Link to="/findpw" className="find-id-link">비밀번호 찾기</Link>
      </form>
      {error && (
        <div className="find-id-error">
          {error}
        </div>
      )}
      {/* Conditionally render the FindIdResult component */}
      {isIdFound && <FindIdResult foundId={foundId} />}
    </div>
  );
};

export default FindIdForm;
