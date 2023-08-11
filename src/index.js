import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import SignUp_infomation from './pages/signUp/SignUp_infomation';
import SignUp_company from './pages/signUp/SignUp_company';
import SignUp_complete from './pages/signUp/SignUp_complete';
import Organization from './pages/organization/Organization';
import Services from './pages/organization/Services';
import Management from './pages/organization/Management';
import Administrator from './pages/organization/Administrator';
import LoginPage from './pages/login/LoginPage';
import FindIdForm from './pages/login/FindIdForm';
import FindPwForm from './pages/login/FindpwForm';
import FindIdResult from './pages/login/FindIdResult';
import SignUp_package from './pages/signUp/SignUp_package';
import Main from './pages/main/Main';
import PrivateRoute from './PrivateRoute';
import Test_up from './pages/signUp/Test_up';
import SignUpHeader from './pages/signUp/SignUpHeader';
import Updatepw from './pages/login/Updatepw';
import LoginRoute from './LoginRoute';
import SendTest from './pages/signUp/SendTest';
import Index1 from './pages/login/Index1';
import UserSetting from './pages/main/UserSetting';
import SignUpRedirect from './pages/signUp/SignUpRedirect';
import SignUp_invite from './pages/signUp/SignUp_invite';
import LoginRedirect from './pages/login/LoginRedirect';
import LoginInvite from './pages/login/LoginInvite';
import UserChangePassword from './pages/main/UserChangePassword';
import Alert1 from './pages/login/Alert1';
import { getAccessToken, getUserRole, setTokenHeader, getUserId } from './jwtUtils';
import RoleRoute from './RoleRoute';
import ExceptionLoginPage from './ExceptionLoginPage';
import ExceptionRolePage from './ExceptionRolePage';

export let persistor = persistStore(store);

const accessToken = getAccessToken(); // Access Token 가져오기
setTokenHeader(accessToken); // Access Token 헤더에 등록하기
console.log("토큰 있는지 확인 : " + accessToken);

// function getCompanyCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// let lastCompanyName;
// if(getUserId(accessToken) !== null) {
//   lastCompanyName = decodeURI(getCompanyCookie(getUserId(accessToken) + 'LastSelectedCompanyName'));
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path='/11' element={<App />} />
        <Route path='/signup' element={<SignUp_infomation />} />
        <Route path='/signup/company' element={<SignUp_company />} />
        <Route path='/signup/complete' element={<SignUp_complete />} />
        <Route path='/signup/package' element={<SignUp_package />} />
        <Route path="/detail" element={<div>라우트 테스트임</div>} />
        <Route path='/organization/*' element={<RoleRoute component={<Organization />} accessToken={accessToken} />} >
          <Route path="management" element={<Management />} />
          <Route path="services" element={<Services />} />
          <Route path="administrator" element={<Administrator />} />
        </Route>
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
        <Route path="/login" element={ <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <LoginRoute url='/main' accessToken={accessToken} /></div>} />
        <Route path="/findId" element={ <FindIdForm></FindIdForm> } />
        <Route path="/findpw" element={ <FindPwForm></FindPwForm> } />
        <Route path="/findidresult" element={ <FindIdResult></FindIdResult> } />
        <Route path="/updatepw" element={ <Updatepw></Updatepw> } />
        <Route path='/main' element={<PrivateRoute component={<Main />} accessToken={accessToken} />}/>
        <Route path='/detailuserinfo' element={<PrivateRoute component={<UserSetting />} accessToken={accessToken} />}/>
        <Route path='/changepassword' element={<PrivateRoute component={<UserChangePassword />} accessToken={accessToken} />}/>
        <Route path="/test" element={ <Test_up></Test_up>} />
        <Route path="/test2" element={ <SignUpHeader></SignUpHeader>} />
        <Route path="/test3" element={ <SendTest></SendTest>} />
        <Route path="/" element={ <Index1></Index1>} />
        <Route path="/s/:shortLink" element={ <SignUpRedirect></SignUpRedirect> }/>
        <Route path="/signup/invite" element={ <SignUp_invite></SignUp_invite>} />
        <Route path="/l/:shortLink" element={ <LoginRedirect></LoginRedirect> }/>
        <Route path="/logininvite" element={ <LoginInvite></LoginInvite> }/>
        <Route path="/alert" element={ <Alert1></Alert1> }/>
        <Route path="/error/401" element={ <ExceptionLoginPage></ExceptionLoginPage> }/>
        <Route path="/error/403" element={ <ExceptionRolePage></ExceptionRolePage> }/>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();