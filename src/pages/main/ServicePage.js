import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { setUser, setService, setCompany, setCompanyName } from '../../store'
import Header from './HeaderComponent/Header';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

const Navbar = styled.nav `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    background: #1c90fb;
    color: white;
    padding: 0px 50px;
    margin-bottom: 40px;

    & > a {
        text-decoration: none;
        color: white;
        font-size: 20px;
    }

    & > div > button, & > div > a > button {
        width: 125px;
        height: 48px;
        background: none;
        border: none;
        color: white;
        font-size: 15px;
    }

    & > div > button:hover, & > div > a > button:hover {
        background: blue;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    & > img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
`;

function ServicePage() {
    const { serviceName } = useParams();
    // redux에 저장된 로그인 한 유저정보 가져오기
    const { user, service, company, companyName, employeeNo } = useSelector((state) => state.loginUserData);

    let title = '';
    let content = '';
    
    // 회사별 배포받은 서비스 필터링
    const availableServices = service.filter(item => employeeNo === item.t_employee_no);
    const availableServicePath = availableServices.find(item => item.t_service_path === `/service/${serviceName}`);

    switch (serviceName) {
        case 'fax':
            title = '팩스';
            content = 'WEHAGO 팩스 서비스입니다.';
            break;
        case 'video-conference':
            title = '화상회의';
            content = 'WEHAGO 화상회의 서비스입니다.';
            break;
        case 'web-storage':
            title = '웹스토리지';
            content = 'WEHAGO 웹스토리지 서비스입니다.';
            break;
        case 'remote-access':
            title = '내 PC 원격접속';
            content = 'WEHAGO 내 PC 원격접속 서비스입니다.';
            break;
        case 'note':
            title = '노트';
            content = 'WEHAGO 노트 서비스입니다.';
            break;
        case 'company-storage-space':
            title = '회사저장공간';
            content = 'WEHAGO 회사저장공간 서비스입니다.';
            break;
        case 'messenger':
            title = '메신저';
            content = 'WEHAGO 메신저 서비스입니다.';
            break;
        case 'mail':
            title = '메일';
            content = 'WEHAGO 메일 서비스입니다.';
            break;
        case 'company-board':
            title = '회사게시판';
            content = 'WEHAGO 회사게시판 서비스입니다.';
            break;
        case 'web-office-pack':
            title = '웹오피스팩';
            content = 'WEHAGO 웹오피스팩 서비스입니다.';
            break;
        case 'sms':
            title = '문자';
            content = 'WEHAGO 문자 서비스입니다.';
            break;
        case 'contact':
            title = '연락처';
            content = 'WEHAGO 연락처 서비스입니다.';
            break;
        case 'client-management':
            title = '거래처관리';
            content = 'WEHAGO 거래처관리 서비스입니다.';
            break;
        case 'organization':
            title = '조직도';
            content = 'WEHAGO 조직도 서비스입니다.';
            break;
        case 'electronic-tax-calculation':
            title = '전자세금계산서';
            content = 'WEHAGO 전자세금계산서 서비스입니다.';
            break;
        default:
            window.location.replace("/main");
    }

    if(availableServicePath === undefined) { // 접속한 url과 t_service_path가 일치하지 않으면 undefined 상태 {
        content = '배포되지 않은 사용자입니다.';
    }

    return (
        <div>
            <Header user={user} company={company} companyName={companyName} setCompanyName={setCompanyName}/>
            <Navbar>
                <Link to={`/service/${serviceName}`}>{title}</Link>
            </Navbar>
            <Content>
                {availableServicePath === undefined ? <img src='https://cdn-icons-png.flaticon.com/128/1828/1828843.png'/> : ''}
                <span>{content}</span>
            </Content>
        </div>
    );
}

export default ServicePage;