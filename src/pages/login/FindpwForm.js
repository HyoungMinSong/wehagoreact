import React, { useState } from 'react';
import './FindpwForm.css';
import { useNavigate } from 'react-router-dom';
import SignUpHeader from '../signUp/SignUpHeader';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosApi from '../../AxiosApi';
import { async } from 'q';

const FindpwForm = () => {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState('email');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [responseCode, setResponseCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [error, setError] = useState('');
  const [idError, setIdError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
    setError('');
    setShowVerificationField(false);
    setVerificationCode('');
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSendVerificationCode = async () => {
    if(id == '') {
      setIdError(true);
      document.getElementById('id').focus();
      return;
    } else {
      setIdError(false);
    }

    if(email == '') {
      setEmailError(true);
      document.getElementById('email').focus();
      return;
    } else {
      setEmailError(false);
    }
    // 회원이 있는지 확인
    axiosApi.post('/findpw', {
      t_user_id: id,
      t_user_email: email,
    }).then((res) => {
      setError('');
      setShowVerificationField(true);
      axiosApi.post('/mailConfirm', {
        email: email
      }).then((response) => {
        alert('입력하신 이메일로 인증 번호를 발송하였습니다.');
        setResponseCode(response.data);
      }).catch((response) => {
        alert('인증 번호 발송 실패..');
      })
    }).catch((res) => {
      setError('아이디 또는 이메일이 일치하지 않습니다.');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (verificationCode === '') {
      setError('인증번호를 입력해주세요.');
      return;
    }

    if(verificationCode == responseCode) {
      navigate('/updatepw', {state: id});
    } else {
      setError('인증번호가 일치하지 않습니다.');
      return;
    }
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
            {idError && <small className='input-id-error'>아이디를 입력하세요.</small>}
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
              {emailError && <small className='input-email-error'>이메일을 입력하세요.</small>}
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