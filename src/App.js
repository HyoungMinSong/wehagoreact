import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import SignUp_infomation from './pages/signUp/SignUp_infomation';



function App() {
  return (
    <div className="App">
      <p>하이~~</p>
      <Link to={'/signup'}>회원가입으로 가기</Link>
      <Routes>
        <Route path='/signup' element={<SignUp_infomation/>}/>
        <Route path="/detail" element={ <div>라우트 테스트임</div> } />
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
    </Routes>
    </div>
  );
}

export default App;
