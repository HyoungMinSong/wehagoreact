// FindIdForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './FindIdForm.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const FindIdForm = () => {
  const [searchOption, setSearchOption] = useState('phone');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [foundId, setFoundId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let params;
      if (searchOption === 'phone') {
        params = { name, phone };
      } else {
        params = { name, email };
      }

      const response = await axios.get('/api/findId', { params });

      // Assuming the response data contains the found ID
      const foundId = response.data.id;
      setFoundId(foundId);
    } catch (error) {
      // Handle error
      console.log(error);
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
      {foundId && (
        <div className="find-id-result">
          <p>Found ID: {foundId}</p>
          {/* Display the found ID or any other message */}
        </div>
      )}
    </div>
  );
};

export default FindIdForm;
