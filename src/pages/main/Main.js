import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import Section from "./Section";
import Footer from "./Footer";
import axiosApi from "../../AxiosApi";
import { styled } from "styled-components";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setService, setCompany, setCompanyName, setEmployeeNo, setCompanyNo } from '../../store'
import NoticeModal from "./NoticeModal";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://images.wallpaperscraft.com/image/single/hong_kong_china_skyscrapers_119347_1280x720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`;

function Main(props) {
    const dispatch = useDispatch();
    const prefixImgUrl = "http://localhost:8080/images/";
    const { user, employeeNo, service, company, companyName } = useSelector((state) => state.loginUserData);
    const [loading, setLoading] = useState(true);
    const [noticeModalOpen, setNoticeModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            // 요청 데이터 가져오기
            const response = await axiosApi.get('/api/data');
            
            if(response.status == 200) {
              setLoading(false);
              const photo = response.data.userDto.t_user_photo_path.startsWith('http') ? response.data.userDto.t_user_photo_path : prefixImgUrl + response.data.userDto.t_user_photo_path;
              const userInfo = 
              {
                  "no" : response.data.userDto.t_user_no,
                  "id" : response.data.userDto.t_user_id,
                  "name" : response.data.userDto.t_user_name,
                  "email" : response.data.userDto.t_user_email,
                  "photo" : photo,
                  "phone" : response.data.userDto.t_user_phone
              }
              const userCompany = response.data.userCompanyDtoList;
              const userService = response.data.userServiceDtoList;

              if(userCompany.length === 0) {
                dispatch(setUser(userInfo));
                window.location.replace('/error/444');
              }

              // 쿠키 불러오기
              let lastSelectedCompanyName = getCompanyCookie(response.data.userDto.t_user_id + 'LastSelectedCompanyName');
              let lastSelectedEmployeeNo;
              let lastSelectedCompanyNo;

              if(!lastSelectedCompanyName) {
                lastSelectedCompanyName = userCompany[0].t_company_name;
                lastSelectedEmployeeNo = userCompany[0].t_employee_no;
                lastSelectedCompanyNo = userCompany[0].t_company_no;
                setCompanyCookie(response.data.userDto.t_user_id + 'LastSelectedCompanyName', encodeURI(lastSelectedCompanyName), 30);
              } else {
                lastSelectedCompanyName = decodeURI(lastSelectedCompanyName);
                lastSelectedEmployeeNo = userCompany.find((item) => item.t_company_name === lastSelectedCompanyName).t_employee_no;
                lastSelectedCompanyNo = userCompany.find((item) => item.t_company_name === lastSelectedCompanyName).t_company_no;
              }
              
              // Redux의 액션을 호출해 데이터 업데이트
              dispatch(setUser(userInfo));
              dispatch(setService(userService));
              dispatch(setCompany(userCompany));
              dispatch(setCompanyName(lastSelectedCompanyName));
              dispatch(setEmployeeNo(lastSelectedEmployeeNo));
              dispatch(setCompanyNo(lastSelectedCompanyNo));

            } else {
              window.location.replace('/login');
            }
          } catch(error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);

    // 쿠키에 데이터 저장
    function setCompanyCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    // 쿠키에서 데이터 불러오기
    function getCompanyCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return(
        <Wrapper>
            {noticeModalOpen && <NoticeModal setNoticeModalOpen={setNoticeModalOpen}/>}
            <MainHeader user={user} employeeNo={employeeNo} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Section user={user} companyName={companyName} service={service}/>
            <Footer/>
        </Wrapper>
    );
}

export default Main;