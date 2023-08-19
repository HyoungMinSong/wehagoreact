import React from 'react';
import { useParams } from 'react-router-dom';

function ServicePage() {
  const { serviceName } = useParams();

  let title = '';
  let content = '';

  switch (serviceName) {
    case 'fax':
        title = '팩스';
        content = '팩스 서비스 내용입니다.';
        break;
    case 'video-conference':
        title = '화상회의';
        content = '화상회의 서비스 내용입니다.';
        break;
    case 'web-storage':
        title = '웹스토리지';
        content = '웹스토리지 서비스 내용입니다.';
        break;
    case 'remote-access':
        title = '내 PC 원격접속';
        content = '내 PC 원격접속 서비스 내용입니다.';
        break;
    case 'note':
        title = '노트';
        content = '노트 서비스 내용입니다.';
        break;
    case 'company-storage-space':
        title = '회사저장공간';
        content = '회사저장공간 서비스 내용입니다.';
        break;
    case 'messenger':
        title = '메신저';
        content = '메신저 서비스 내용입니다.';
        break;
    case 'mail':
        title = '메일';
        content = '메일 서비스 내용입니다.';
        break;
    case 'company-board':
        title = '회사게시판';
        content = '회사게시판 서비스 내용입니다.';
        break;
    case 'web-office-pack':
        title = '웹오피스팩';
        content = '웹오피스팩 서비스 내용입니다.';
        break;
    case 'sms':
        title = '문자';
        content = '문자 서비스 내용입니다.';
        break;
    case 'contact':
        title = '연락처';
        content = '연락처 서비스 내용입니다.';
        break;
    case 'client-management':
        title = '거래처관리';
        content = '거래처관리 서비스 내용입니다.';
        break;
    case 'organization':
        title = '조직도';
        content = '조직도 서비스 내용입니다.';
        break;
    case 'electronic-tax-calculation':
        title = '전자세금계산서';
        content = '전자세금계산서 서비스 내용입니다.';
        break;
    default:
        title = '노 지원';
        content = '지원되지 않는 서비스입니다.';
  }

  return (
    <div>
      <h2>{title} 서비스</h2>
      <p>{content}</p>
    </div>
  );
}

export default ServicePage;