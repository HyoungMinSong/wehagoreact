import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import SignUp_infomation from './pages/signUp/SignUp_infomation';
import SignUp_company from './pages/signUp/SignUp_company';
import SignUp_complete from './pages/signUp/SignUp_complete';
import Organization from './pages/organization/Organization';
import Administrator from './pages/organization/Administrator';
import Services from './pages/organization/Services';
import Management from './pages/organization/Management';

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
        <Route path='/organization/*' element={ <Organization /> } >
          <Route path="management" element={<Management />} />
          <Route path="administrator" element={<Administrator />} />
          <Route path="services" element={<Services />} />
        </Route>
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
    </Routes>
    </div>
  );
}

export default App;