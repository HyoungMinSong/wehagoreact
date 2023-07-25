import jwt_decode from 'jwt-decode';
import axiosApi from '../src/AxiosApi';

export const checkAndRefreshToken = async () => {
  // localStorage에서 저장된 Access Token 가져오기
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    // Access Token 디코딩하여 만료 시간 체크
    const decodedToken = jwt_decode(accessToken);
    const tokenExpiration = new Date(decodedToken.exp * 1000);

    // 현재 시간과 비교하여 토큰 만료 확인
    if (tokenExpiration < new Date()) {
      // Access Token 만료됨, 재발급 요청
      console.log('Access Token이 만료되었습니다. 재발급 요청...');
      await reissueAccessToken();
    } else {
      console.log('Access Token이 유효합니다.');
    }
  } else {
    console.log('로그인이 필요합니다.');
    // alert('로그인이 필요합니다.');
    // window.location.replace("/login");
  }
};

export const reissueAccessToken = async () => {
  try {
      // 쿠키를 가져와서 axiosApi 인스턴스에 설정하기
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
    
      const refreshToken = getCookie('refreshToken');
      
      if(refreshToken) {
        // Refresh Token을 서버로 전송하여 재발급 요청
        const response = await axiosApi.post('/api/reissue', null, {
            headers: {
                Authorization: 'Bearer ' + refreshToken
            }
        });

        if (response.status === 200) {
          console.log('Access Token 재발급 성공!');
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          
          const newRefreshToken = response.data.refreshToken;
          const decodedRefreshToken = jwt_decode(newRefreshToken);
          const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);
        
          // Refresh Token을 쿠키에 등록
          const expires = refreshTokenExpiration.toUTCString();
          document.cookie = `refreshToken=${newRefreshToken}; path=/; expires=${expires}`;

          // 재발급 된 Access Token으로 axios의 Authorization 헤더 업데이트
          axiosApi.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        } else {
          console.error('Access Token 재발급 실패!');
        }
      } else {
        console.error('Refresh Token이 만료 되었습니다. 다시 로그인 하세요.');
        localStorage.removeItem('accessToken'); // 남아있는 Access Token 지우기
        alert('재로그인이 필요합니다.');
        // 로그인 창 돌아 가기
        window.location.replace('/login');
      }    
    } catch (error) {
    console.error('Access Token 재발급 요청 중 오류 발생:', error);
  }
};