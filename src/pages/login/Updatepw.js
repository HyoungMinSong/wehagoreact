import React, { useState } from 'react';
import './Updatepw.css';
import axiosApi from "../../AxiosApi";
import { useLocation } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';
import SignUpHeader from '../signUp/SignUpHeader';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Updatepw = () => {
  const {state} = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [userId, setUserId] = useState('');
  const pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        setError('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      if(userId == null) {
        return;
      }

      if(!pwRegex.test(newPassword)) {
        return;
      }

      if(!pwRegex.test(confirmNewPassword)) {
        return;
      }

      const url = '/updatepw';
      const data = {
        t_user_id: state,
        t_user_new_password: newPassword,
        t_user_new_password_check: confirmNewPassword,
      };

      const response = await axiosApi.post(url, data);
      
      if(response.data) {
        setError('')
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.replace('/login');
      } else {
        setError('비밀번호 변경에 실패했습니다.');
        setIsPasswordChanged(false);
      }
    } catch (error) {
      console.error(error);
      setError('비밀번호 변경에 실패했습니다.');
      setIsPasswordChanged(false);
    }
  };

  return (
    <>
    <SignUpHeader>
    </SignUpHeader>
    <div className="update-password-container">
      <form className="update-password-form" onSubmit={handleSubmit}>
        <div className="update-password-title">
        <LockOutlinedIcon fontSize='large' />비밀번호 재설정</div>
        <div className='update-password-description-div'>
            <div className="update-password-description">보안을 위해 비밀번호를 다시 설정해 주세요.</div>
            <div className="update-password-description">8~16자의 영문 대소문자, 숫자, 특수문자를 조합하여 비밀번호를</div>
            <div className="update-password-description">입력하세요.</div>
        </div>
        <div className="update-password-form-group">
          <label className="update-password-form-label" htmlFor="userId">현재 아이디</label>
          <input
            className="update-password-form-input"
            type="text"
            id="userId"
            value={state}
            onChange={(e) => setUserId(e.target.value)}
            disabled
          />
        </div>
        <div className="update-password-form-group">
          <label className="update-password-form-label" htmlFor="newPassword">새 비밀번호</label>
          <input
            className="update-password-form-input"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="update-password-form-group">
          <label className="update-password-form-label" htmlFor="confirmNewPassword">새 비밀번호 확인</label>
          <input
            className="update-password-form-input"
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='update-password-form-button-div'>
        <button className="update-password-form-button" type="submit">비밀번호 재설정</button>
        </div>
      </form>
      {error && (
        <div className="update-password-error">
          {error}
        </div>
      )}
      {isPasswordChanged && (
        <div className="update-password-success">
          비밀번호가 성공적으로 변경되었습니다.
        </div> 
      )}
    </div>
    /</>
  );
};

export default Updatepw;
