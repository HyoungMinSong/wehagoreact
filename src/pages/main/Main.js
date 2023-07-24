import React, { useEffect, useState } from "react";
import Header from "./HeaderComponent/Header";
import Section from "./Section";
import Footer from "./Footer";
import axiosApi from "../../AxiosApi";
import { styled } from "styled-components";
import { checkAndRefreshToken } from '../../jwtUtils';

const Wrapper = styled.div`
  width: 1500px;
  background: linear-gradient(#3D7EAA, #FFE47A);
`;

function Main(props) {
    const baseUrl = "http://localhost:8080";
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // localStorage에 있는 Access Token 가져오기
            const accessToken = localStorage.getItem('accessToken');
          
            // Access Token이 있으면 헤더에 등록 시키기
            if (accessToken) {
              axiosApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
          
            try {
              // checkAndRefreshToken() 함수 실행 후 데이터 요청
              await checkAndRefreshToken();
              
              // 요청 데이터 가져오기
              const response = await axiosApi.get('/api/data');
              setUserData(response.data);
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
        };
          
        fetchData();
    }, []);

    const dummyUserData = 
        {
            "name": "이주용",
            "rank": "사원",
            "email": "aaa@google.com",
        };
    const [user, setUser] = useState(dummyUserData);

    const dummyServiceData = [
        {
            "id": "1",
            "name" : "메신저"
        },
        {
            "id": "2",
            "name" : "화상회의"
        },
        {
            "id": "3",
            "name" : "웹스토리지"
        },
        {
            "id": "4",
            "name" : "거래처관리"
        },
        {
            "id": "5",
            "name" : "연락처"
        },
        {
            "id": "6",
            "name" : "메일"
        },
        {
            "id": "7",
            "name" : "일정관리"
        },
        {
            "id": "8",
            "name" : "할일관리"
        },
        {
            "id": "9",
            "name" : "노트"
        },
        {
            "id": "10",
            "name" : "팩스"
        },
        {
            "id": "11",
            "name" : "내PC원격접속"
        }
    ];
    const [service, setService] = useState(dummyServiceData);
    
    const dummyCompanyData = [
        {
            "id": "1",
            "name" : "삼성"
        },
        {
            "id": "2",
            "name" : "더존비즈온"
        },
        {
            "id": "3",
            "name" : "카카오"
        },
        {
            "id": "4",
            "name" : "네이버"
        },
        {
            "id": "5",
            "name" : "쿠팡"
        }
    ];
    const [company, setCompany] = useState(dummyCompanyData);
    
    return(
        <Wrapper>
            <Header user={user} company={company}/>
            <Section user={user} service={service}/>
            <Footer/>
        </Wrapper>
    );
}

export default Main;