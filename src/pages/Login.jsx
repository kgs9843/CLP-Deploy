import React, { useEffect, useState } from "react";
import KakaoIcon from "../assets/kakaoIcon.svg";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/bg-video.mp4";
import { useNavStore } from "../stores/navStore";
import LogoSVG from "../assets/Logo.svg";
import { kakaoLogin } from "../api/kakaoLogin";
import { checkUser } from "../api/checkUser";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false);

  // 네비바 주스탠드로 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);

  useEffect(() => {
    hideNav(); // 진입시 네비 숨김
    (async () => {
      try {
        const result = await checkUser();
        setUserInfo(result);
        navigate("/main");
        console.log(result);
      } catch (error) {
        console.error("API 호출 실패:", error);
      } finally {
        setLoading(false);
      }
    })();
    return showNav; // 언마운트(나갈 때) 복구
  }, []);

  const loginBtnClicked = () => {
    kakaoLogin();
  };

  if (loading)
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <div>로딩중...</div>
      </div>
    );

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        muted
        loop
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="relative z-10 h-full w-full flex flex-col p-5 justify-between items-center text-white">
        <div className="w-auto flex flex-col justify-center mt-20">
          <span className="text-sm mb- font-thin">
            <span className="font-bold">환경과 소상공인</span>을 위한 작은 실천
            시작하기
          </span>
          <div className="w-full h-auto flex flex-row justify-start items-center">
            <img src={LogoSVG} alt="LOGO" />
          </div>
        </div>
        <div
          className="w-full left-0 h-10 mb-8 rounded-3xl flex flex-row justify-center items-center cursor-pointer"
          style={{ backgroundColor: "#F8DF02" }}
          onClick={loginBtnClicked}
        >
          <img src={KakaoIcon} alt="Kakao" className="absolute left-12" />
          <div className="font-bold text-sm text-black">카카오 로그인</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
