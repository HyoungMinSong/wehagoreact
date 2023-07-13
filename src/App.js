import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <p>하이~~</p>
      <Routes>
        <Route path="/detail" element={ <div>라우트 테스트임</div> } />
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
    </Routes>
    </div>
  );
}

export default App;
