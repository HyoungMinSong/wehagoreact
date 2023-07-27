import React, { useEffect, useState } from "react";
import Header from "./HeaderComponent/Header";
import Section from "./Section";
import Footer from "./Footer";
import axiosApi from "../../AxiosApi";
import { styled } from "styled-components";
import { Spinner } from "react-bootstrap";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://images.wallpaperscraft.com/image/single/hong_kong_china_skyscrapers_119347_1280x720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
`;

function Main(props) {
    const [user, setUser] = useState({});
    const [service, setService] = useState([]);
    const [company, setCompany] = useState([]);
    const [companyName, setCompanyName] = useState('');
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
            //   await checkAndRefreshToken();
              // 요청 데이터 가져오기
              const response = await axiosApi.get('/api/data');
              
              if(response.status == 200) {
                setLoading(false);
                const userInfo = 
                {
                    "name" : response.data.t_user_name,
                    "email" : response.data.t_user_email,
                    "photo" : response.data.t_user_photo_path
                }
                const userCompany = response.data.userCompanyDtoList;
                const userService = response.data.userServiceDtoList;
                
                setUser(userInfo);
                setCompany(userCompany);
                setService(userService);
                setCompanyName(userCompany[0].t_company_name);
              }
              
            } catch (error) {
              console.error(error);
            }
        };
        fetchData();
    }, []);
    
    return(
        <Wrapper>
            {loading && (
            <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
                <div className="mt-3">유저 정보를 불러오는 중입니다.<br />잠시만 기다려주세요.</div>
            </div>)}
            <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Section user={user} companyName={companyName} service={service}/>
            <Footer/>
        </Wrapper>
    );
}

export default Main;