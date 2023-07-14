import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import SignUp_infomation from './pages/signUp/SignUp_infomation';
import SignUp_company from './pages/signUp/SignUp_company';
import SignUp_complete from './pages/signUp/SignUp_complete';




function App() {
  return (
    <div className="App">
      <p>하이~~</p>
      <Link to={'/signup'}>회원가입으로 가기</Link>
      <br/>
      <Link to={'/signup/company'}>회원가입/회사정보입력으로 가기</Link>
      <br/>
      <Link to={'/signup/complete'}>회원가입/회원가입완료로 가기</Link>
      <Routes>
        <Route path='/signup' element={<SignUp_infomation/>}/>
        <Route path='/signup/company' element={<SignUp_company/>}/>
        <Route path='/signup/complete' element={<SignUp_complete/>}/>
        <Route path="/detail" element={ <div>라우트 테스트임</div> } />
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
    </Routes>
    </div>
  );
}

export default App;
