import React, { useState } from 'react';
import './FindpwForm.css';
import { useNavigate } from 'react-router-dom';
import SignUpHeader from '../signUp/SignUpHeader';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import emailjs from '@emailjs/browser';

const FindpwForm = () => {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState('email');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [error, setError] = useState('');

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
    setError('');
    setShowVerificationField(false);
    setVerificationCode('');
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const generateRandomVerificationCode = () => {
    // 4자리 랜덤 숫자 생성
    const min = 1000;
    const max = 9999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode;
  };

  const handleSendVerificationCode = () => {
    const simulatedVerificationCode = generateRandomVerificationCode();
    setVerificationCode(simulatedVerificationCode);
    setShowVerificationField(true);

    // 이메일로 인증번호 전송
    const templateParams = {
      to_email: email, // 수신자 이메일 주소
      verification_code: simulatedVerificationCode, // 생성된 인증번호
    };
    // EmailJS를 사용하여 이메일 전송
    emailjs.send(
      'your_emailjs_service_id',
      'your_emailjs_template_id',
      templateParams,
      'your_emailjs_user_id'
    )
    .then((response) => {
      console.log('이메일 전송 성공:', response.status, response.text);
    })
    .catch((error) => {
      console.error('이메일 전송 오류:', error);
      // 이메일 전송 중 오류가 발생할 경우 오류 메시지를 설정하거나 필요한 처리를 합니다.
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // TODO: Send API request to server for verification of the entered code
    // Compare the entered code with the code sent to the email.
    if (verificationCode === '') {
      setError('인증번호를 입력해주세요.');
      return;
    }

    // If verification is successful, navigate to the password update page
    navigate('/updatepw');
  };

  return (
    <>
      <SignUpHeader />
      <div className="find-pw-container">
        <form className="find-pw-form">
          <div className="find-pw-title">
            <LockOutlinedIcon fontSize="large" />
            비밀번호 찾기
          </div>
          <div className="find-pw-description">
            WEHAGO에 등록된 회원정보로 비밀번호를 찾으실 수 있습니다.
          </div>
          <div className="find-pw-form-group">
            <label className="find-pw-form-label" htmlFor="name">
              아이디
            </label>
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
              <label className="find-pw-form-label" htmlFor="email">
                이메일
              </label>
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
          <button
            type="button"
            className="find-pw-form-button"
            onClick={handleSendVerificationCode}
          >
            인증번호 발송
          </button>
          {showVerificationField && (
            <div className="find-pw-form-group">
              <label className="find-pw-form-label" htmlFor="verificationCode">
                인증번호
              </label>
              <input
                className="find-pw-form-input"
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <div className="find-pw-button-group">
                <button
                  type="button"
                  className="find-pw-confirm-button"
                  onClick={handleSubmit}
                >
                  확인
                </button>
                <button
                  type="button"
                  className="find-id-link"
                  onClick={handleCancel}
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {error && <div className="find-pw-error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default FindpwForm;