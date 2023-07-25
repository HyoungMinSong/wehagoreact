import React, { useState } from 'react';
import './Updatepw.css';
import axiosApi from "../../AxiosApi";
import { Link } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';


const Updatepw = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        setError('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      const url = '/updatepw';
      const data = {
        t_user_id: currentUsername,
        t_user_password: currentPassword,
        t_user_new_password: newPassword,
        t_user_new_password_check: confirmNewPassword,
      };

      const response = await axiosApi.post(url, data);

      // API 응답을 처리하고 UI를 업데이트하는 코드를 추가하세요.
      // 예를 들어, 비밀번호가 성공적으로 변경된 경우 성공 메시지를 표시할 수 있습니다.
      
      if(response.data) {
        setError('');
        setIsPasswordChanged(true);
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
    <div className="update-password-container">
      <form className="update-password-form" onSubmit={handleSubmit}>
        <div className="update-password-title">비밀번호 재설정</div>
        <div className='update-password-description-div'>
            <div className="update-password-description">보안을 위해 비밀번호를 다시 설정해 주세요.</div>
            <div className="update-password-description">8~16자의 영문 대소문자, 숫자, 특수문자를 조합하여 비밀번호를</div>
            <div className="update-password-description">입력하세요.</div>
        </div>
        <div className="update-password-form-group">
          <label className="update-password-form-label" htmlFor="currentUsername">현재 아이디</label>
          <input
            className="update-password-form-input"
            type="text"
            id="currentUsername"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            required
          />
        </div>
        <div className="update-password-form-group">
          <label className="update-password-form-label" htmlFor="currentPassword">현재 비밀번호</label>
          <input
            className="update-password-form-input"
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
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
      <div>
        <Link to="/login" className="update-password-login-link">로그인</Link>
        </div>
    </div>
  );
};

export default Updatepw;
