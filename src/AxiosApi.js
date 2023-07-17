import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8080', // 스프링 부트 서버의 baseURL로 변경
});

export default axiosApi;
