import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import SignUp_infomation from './pages/signUp/SignUp_infomation';
import SignUp_company from './pages/signUp/SignUp_company';
import SignUp_complete from './pages/signUp/SignUp_complete';
import Organization from './pages/organization/Organization';
import Administrator from './pages/organization/Administrator';
import Services from './pages/organization/Services';
import Management from './pages/organization/Management';
import LoginPage from './pages/login/LoginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
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
        <Route path="/login" element={ 
          <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <LoginPage></LoginPage> 
        </div>
        } />
      </Routes>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();