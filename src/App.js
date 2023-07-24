import './App.css';

import { Link } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <p>하이~~</p>
      <Link to={'/signup'}>회원가입으로 가기</Link>
      <br/>
      <Link to={'/signup/company'}>회원가입/회사정보입력으로 가기</Link>
      <br/>
      <Link to={'/signup/complete'}>회원가입/회원가입완료로 가기</Link>
      <br/>
      <Link to={'/signup/package'}>회원가입/가입패키지결제로 가기</Link>
      <br/>
      <Link to={'/login'}>로그인으로 가기</Link>
      <br />
      <Link to={'/organization/management'}>조직도로 가기</Link>
      <br/>
      <Link to={'/main'}>메인화면으로 가기</Link>
    </div>
  );
}

export default App;