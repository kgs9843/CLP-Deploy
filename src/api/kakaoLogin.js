// Vite에서는 import.meta.env 로 환경 변수 사용
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const kakaoLogin = () => {
  window.location.href = `${VITE_API_URL}/oauth2/authorization/kakao`;
};
