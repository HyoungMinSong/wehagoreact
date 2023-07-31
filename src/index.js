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
import Administrator from './pages/organization/Administrator';
import Services from './pages/organization/Services';
import Management from './pages/organization/Management';
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
import UserSetting from './pages/main/UserSetting';
import SignUpRedirect from './pages/signUp/SignUpRedirect';
import SignUp_invite from './pages/signUp/SignUp_invite';

export let persistor = persistStore(store);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
const accessToken = getCookie('accessToken');
console.log("토큰 있는지 확인 : " + accessToken);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<SignUp_infomation />} />
        <Route path='/signup/company' element={<SignUp_company />} />
        <Route path='/signup/complete' element={<SignUp_complete />} />
        <Route path='/signup/package' element={<SignUp_package />} />
        <Route path="/detail" element={<div>라우트 테스트임</div>} />
        <Route path='/organization/*' element={<Organization />} >
          <Route path="management" element={<Management />} />
          <Route path="administrator" element={<Administrator />} />
          <Route path="services" element={<Services />} />
        </Route>
        <Route path="/about" element={ <div>라우트 테스트임2222</div> } />
        <Route path="/login" element={ <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <LoginRoute url='/main' isLogin={accessToken} /></div>} />
        <Route path="/findId" element={ <FindIdForm></FindIdForm> } />
        <Route path="/findpw" element={ <FindPwForm></FindPwForm> } />
        <Route path="/findidresult" element={ <FindIdResult></FindIdResult> } />
        <Route path="/updatepw" element={ <Updatepw></Updatepw> } />
        <Route path='/main' element={<PrivateRoute component={<Main />} isLogin={accessToken} />}/>
        <Route path='/detailuserinfo' element={<PrivateRoute component={<UserSetting />} isLogin={accessToken} />}/>
        <Route path="/test" element={ <Test_up></Test_up>} />
        <Route path="/test2" element={ <SignUpHeader></SignUpHeader>} />
        <Route path="/test3" element={ <SendTest></SendTest>} />
        <Route path="/s/:shortLink" element={ <SignUpRedirect></SignUpRedirect> }/>
        <Route path="/signup/invite" element={ <SignUp_invite></SignUp_invite>} />

        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();