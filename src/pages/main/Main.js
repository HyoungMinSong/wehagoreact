import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import Section from "./Section";
import Footer from "./Footer";
import axiosApi from "../../AxiosApi";
import { styled } from "styled-components";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setService, setCompany, setCompanyName } from '../../store'

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
  const { user, service, company, companyName } = useSelector((state) => state.loginUserData);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // 쿠키에 있는 Access Token 가져오기
            const getCookie = (name) => {
              const value = `; ${document.cookie}`;
              const parts = value.split(`; ${name}=`);
              if (parts.length === 2) return parts.pop().split(';').shift();
            };
          const accessToken = getCookie('accessToken');
        
          // Access Token이 있으면 헤더에 등록 시키기
          if (accessToken) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          } else {
              alert('로그인 시간이 만료되어 재로그인이 필요합니다.');
              window.location.replace('/login');
          }

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

              // 쿠키 불러오기
              let lastSelectedCompanyId = getCompanyCookie(response.data.userDto.t_user_id + 'LastSelectedCompanyId');
              let lastSelectedCompanyName = '';
              if(lastSelectedCompanyId) {
                for (const companyDto of userCompany) {
                  if(companyDto.t_company_no == lastSelectedCompanyId) {
                    lastSelectedCompanyName = companyDto.t_company_name;
                    break;
                  }
                }
              } else {
                lastSelectedCompanyName = userCompany[0].t_company_name;
              }
              
              // Redux의 액션을 호출해 데이터 업데이트
              dispatch(setUser(userInfo));
              dispatch(setService(userService));
              dispatch(setCompany(userCompany));
              dispatch(setCompanyName(lastSelectedCompanyName));
              
            } else {
              window.location.replace('/login');
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);

    // 쿠키에서 데이터 불러오기
    function getCompanyCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return(
        <Wrapper>
            {loading && (
            <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
                <div className="mt-3">유저 정보를 불러오는 중입니다.<br />잠시만 기다려주세요.</div>
            </div>)}
            <MainHeader user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Section user={user} companyName={companyName} service={service}/>
            <Footer/>
        </Wrapper>
    );
}

export default Main;