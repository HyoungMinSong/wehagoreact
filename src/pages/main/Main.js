import React, { useEffect, useState } from "react";
import Header from "./HeaderComponent/Header";
import Section from "./Section";
import Footer from "./Footer";
import axiosApi from "../../AxiosApi";
import { styled } from "styled-components";
import { checkAndRefreshToken } from '../../jwtUtils';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(#3D7EAA, #FFE47A);
`;

function Main(props) {
    const baseUrl = "http://localhost:8080";
    const [user, setUser] = useState({});
    const [service, setService] = useState([]);
    const [company, setCompany] = useState([]);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // localStorage에 있는 Access Token 가져오기
            const accessToken = localStorage.getItem('accessToken');
          
            // Access Token이 있으면 헤더에 등록 시키기
            if (accessToken) {
              axiosApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
          
            try {
            //   await checkAndRefreshToken();
              // 요청 데이터 가져오기
              const response = await axiosApi.get('/api/data');
              console.log(response.data);
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
            // const dummyUserData = 
            // {
            //     "name": "이주용",
            //     "rank": "사원",
            //     "email": "aaa@google.com",
            // };
            // setUser(dummyUserData);
            

            // const dummyServiceData = [
            //     {
            //         "id": "1",
            //         "name" : "메신저"
            //     },
            //     {
            //         "id": "2",
            //         "name" : "화상회의"
            //     },
            //     {
            //         "id": "3",
            //         "name" : "웹스토리지"
            //     },
            //     {
            //         "id": "4",
            //         "name" : "거래처관리"
            //     },
            //     {
            //         "id": "5",
            //         "name" : "연락처"
            //     },
            //     {
            //         "id": "6",
            //         "name" : "메일"
            //     },
            //     {
            //         "id": "7",
            //         "name" : "일정관리"
            //     },
            //     {
            //         "id": "8",
            //         "name" : "할일관리"
            //     },
            //     {
            //         "id": "9",
            //         "name" : "노트"
            //     },
            //     {
            //         "id": "10",
            //         "name" : "팩스"
            //     },
            //     {
            //         "id": "11",
            //         "name" : "내PC원격접속"
            //     }
            // ];
            // setService(dummyServiceData);
            
            // const dummyCompanyData = [
            //     {
            //         "id": "1",
            //         "name" : "삼성"
            //     },
            //     {
            //         "id": "2",
            //         "name" : "더존비즈온"
            //     },
            //     {
            //         "id": "3",
            //         "name" : "카카오"
            //     },
            //     {
            //         "id": "4",
            //         "name" : "네이버"
            //     },
            //     {
            //         "id": "5",
            //         "name" : "쿠팡"
            //     }
            // ];
            // setCompany(dummyCompanyData);
            } catch (error) {
              console.error(error);
            }
        };
        fetchData();
    }, []);
    
    return(
        <Wrapper>
            <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Section user={user} companyName={companyName} service={service}/>
            <Footer/>
        </Wrapper>
    );
}

export default Main;