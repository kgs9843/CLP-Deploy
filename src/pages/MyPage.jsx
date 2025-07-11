import React, { useState } from "react";
import ProfileSVG from "../assets/icons/Profile.svg";
import CouponSVG from "../assets/icons/Coupon.svg";
import InquirySVG from "../assets/icons/Inquiry.svg";
import AlertSVG from "../assets/icons/Alert.svg";
import EditSVG from "../assets/icons/Edit.svg";
import MyPageMenuItem from "../components/MyPageMenuItem";
import CouponPopup from "../components/Popup/CouponPopup";
import NoticePopup from "../components/Popup/NoticePopup";
import InquiryPopup from "../components/Popup/InquiryPopup";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const MyPage = () => {
  const navigate = useNavigate();
  const point = useUserStore((state) => state.point);
  const name = useUserStore((state) => state.name);
  const [isCouponPopupOpen, setIsCouponPopupOpen] = useState(false);
  const [isNoticePopupOpen, setIsNoticePopupOpen] = useState(false);
  const [isInquiryPopupOpen, setIsInquiryPopupOpen] = useState(false);

  // 클릭 핸들러
  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭됨");
    navigate("/");
    // 예: 토큰 삭제, navigate("/login")
  };

  const handleWithdraw = () => {
    console.log("탈퇴 요청 클릭됨");
    // 탈퇴 API 호출 등
  };

  const handleEditProfile = () => {
    console.log("프로필 편집 클릭됨");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center p-4 subColor">
      <div className="flex w-full flex-row items-center mb-4 mt-15 gap-5">
        <div className="w-15 h-15 rounded-2xl subColorGreen flex justify-center items-center">
          <img src={ProfileSVG} alt="프로필" className="w-8 h-8 rounded-full" />
        </div>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full mt-2 text-sm text-start textGraySubColor2">
            🌱 지구 수호대
          </div>
          <div className="w-full text-start text-lg font-semibold textMainColor flex flex-row justify-start items-center">
            <span className="font-extrabold">{name}</span>님{" "}
            <img
              src={EditSVG}
              alt="편집"
              className="w-5 cursor-pointer"
              onClick={handleEditProfile}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white rounded-xl p-4 mb-4 w-full h-25">
        <div className="text-md">보유 CLP 포인트</div>
        <div className="flex items-center gap-5">
          <div className="mainColor rounded-4xl w-8 h-8 text-white flex justify-center items-center font-bold">
            P
          </div>
          <span className="font-extrabold textMainColor text-4xl">
            {point} <span className="font-semibold">P</span>
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <MyPageMenuItem
          icon={CouponSVG}
          title="쿠폰함"
          subtitle="지금까지 모은 식당 할인권을 확인하세요"
          onClick={() => setIsCouponPopupOpen(true)}
        />
        <MyPageMenuItem
          icon={AlertSVG}
          title="공지사항"
          onClick={() => setIsNoticePopupOpen(true)}
        />
        <MyPageMenuItem
          icon={InquirySVG}
          title="문의사항"
          onClick={() => setIsInquiryPopupOpen(true)}
        />
      </div>

      <button
        className="w-full mt-10 mainColor text-white rounded-full py-2 mb-4"
        onClick={handleLogout}
      >
        로그아웃
      </button>

      <div
        className="text-center text-sm textGraySubColor underline cursor-pointer"
        onClick={handleWithdraw}
      >
        탈퇴를 원하시면, 여기를 눌러주세요.
      </div>

      {/* 각각의 팝업 컴포넌트 */}
      {isCouponPopupOpen && (
        <CouponPopup onClose={() => setIsCouponPopupOpen(false)} />
      )}
      {isNoticePopupOpen && (
        <NoticePopup onClose={() => setIsNoticePopupOpen(false)} />
      )}
      {isInquiryPopupOpen && (
        <InquiryPopup onClose={() => setIsInquiryPopupOpen(false)} />
      )}
    </div>
  );
};

export default MyPage;
