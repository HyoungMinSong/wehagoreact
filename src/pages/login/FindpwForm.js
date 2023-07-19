// FindPwForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './FindpwForm.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const FindPwForm = () => {
  const [searchOption, setSearchOption] = useState('phone');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let params;
      if (searchOption === 'phone') {
        params = { id, phone };
      } else {
        params = { id, email };
      }

      const response = await axios.get('/api/resetPassword', { params });

      // Assuming the response data contains the success status
      const resetSuccess = response.data.success;
      if (resetSuccess) {
        setResetLinkSent(true);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className="find-pw-container">
      <form className="find-pw-form" onSubmit={handleSubmit}>
        <div className="find-pw-title">비밀번호 찾기</div>
        <div className="find-pw-description">WEHAGO에 등록된 회원정보로 비밀번호를 찾으실 수 있습니다.</div>
        <div className="find-pw-search-option">
          <div className="find-pw-option">
            <input
              type="radio"
              id="phone-option"
              value="phone"
              checked={searchOption === 'phone'}
              onChange={handleSearchOptionChange}
            />
            <label htmlFor="phone-option">휴대폰 번호로 찾기</label>
          </div>
          <div className="find-pw-option">
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
        <div className="find-pw-form-group">
          <label className="find-pw-form-label" htmlFor="id">아이디</label>
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
            <label className="find-pw-form-label" htmlFor="email">이메일</label>
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
        <button className="find-pw-form-button" type="submit">Find PW</button>
        <Link to="/findid" className="find-pw-link">아이디 찾기</Link>
      </form>
      {resetLinkSent && (
        <div className="find-pw-result">
          <p>비밀번호 재설정 링크가 전송되었습니다.</p>
          {/* Display the reset link sent message or any other message */}
        </div>
      )}
    </div>
  );
};

export default FindPwForm;
