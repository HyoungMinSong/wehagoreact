import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8080', // 스프링 부트 서버의 baseURL로 변경
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', // 인코딩 설정 추가
  },
});

export default axiosApi;
