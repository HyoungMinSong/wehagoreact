import React, { useEffect, useState } from "react";
import Header from "./HeaderComponent/Header";
import Section from "./Section";
import Footer from "./Footer";
import axios from "axios";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 1500px;
  background: linear-gradient(#3D7EAA, #FFE47A);
`;

function Main(props) {
    // const baseUrl = "http://localhost:8080";
    // const [userData, setUserData] = useState([]);

    // useEffect(() => {
    //     axios.get(baseUrl + '/api/login/user/data')
    //     .then(response => setUserData(response.data))
    //     .catch(error => console.log(error))
    // }, []);
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