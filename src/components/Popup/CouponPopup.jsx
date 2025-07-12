import React, { useState, useEffect } from "react";
import Back3DBtnIcon from "../../assets/icons/Back_3D_btn.svg";
import { useNavStore } from "../../stores/navStore";
import { useUserStore } from "../../stores/userStore";
import { getDDay } from "../../utils/getDay";
import CouponMenuItem from "../CouponMenuItem";
import CouponClickPopup from "./CouponClickPopup";
import { fetchCoupon } from "../../api/fetchCoupon";
const dummyCoupons = [
  {
    id: 1,
    imageUrl: null,
    title: "버거 할인 쿠폰",
    deadline: "2025-07-20",
    isAvailable: true,
  },
  {
    id: 2,
    imageUrl: null,
    title: "피자 할인 쿠폰",
    deadline: "2025-07-25",
    isAvailable: true,
  },
  {
    id: 3,
    imageUrl: null,
    title: "카페 음료 1+1 쿠폰",
    deadline: "2025-07-12",
    isAvailable: false,
  },
  {
    id: 4,
    imageUrl: null,
    title: "치킨 반값 쿠폰",
    deadline: "2025-07-10",
    isAvailable: false,
  },
  {
    id: 5,
    imageUrl: null,
    title: "샐러드 무료 쿠폰",
    deadline: "2025-08-01",
    isAvailable: true,
  },
  {
    id: 6,
    imageUrl: null,
    title: "아이스크림 1+1 쿠폰",
    deadline: "2025-07-15",
    isAvailable: false,
  },
];
const CouponPopup = ({ onClose }) => {
  // 네비바 주스탠드로 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);
  const userId = useUserStore((state) => state.id);
  const [activeTab, setActiveTab] = useState("사용 가능");
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 추가
  const [coupons, setCoupons] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const result = await fetchCoupon(userId);
        const today = new Date();

        const processedCoupons = result.map((coupon) => {
          const expiresAt = new Date(coupon.expiresAt);
          return {
            ...coupon,
            isAvailable: expiresAt > today,
          };
        });

        console.log(processedCoupons);
        setCoupons(processedCoupons);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    })();
    hideNav(); // 진입시 네비 숨김
    return showNav; // 언마운트(나갈 때) 복구
  }, []);

  const filteredCoupons = dummyCoupons.filter(
    (coupon) =>
      (activeTab === "사용 가능" && coupon.isAvailable) ||
      (activeTab === "사용 완료" && !coupon.isAvailable)
  );
  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon); // 팝업 띄울 쿠폰 저장
  };
  return (
    <div className="absolute w-full h-full inset-0 subColor flex-1 px-4 flex flex-col z-50">
      <div className="w-full h-10 mt-15 font-bold text-2xl text-end flex flex-row justify-between">
        <img
          src={Back3DBtnIcon}
          alt="뒤로가기 버튼"
          className="w-8 h-8"
          onClick={onClose}
        />
        <div>쿠폰함</div>
      </div>
      <div className="relative w-full h-8 flex gap-4 flex-row justify-center items-center mt-5">
        <div
          className={`cursor-pointer font-medium  ${
            activeTab === "사용 가능" ? " textMainColor" : "textGraySubColor"
          }`}
          onClick={() => setActiveTab("사용 가능")}
        >
          사용 가능
        </div>
        <div
          className={`cursor-pointer font-medium ${
            activeTab === "사용 완료" ? "textMainColor" : "textGraySubColor"
          }`}
          onClick={() => setActiveTab("사용 완료")}
        >
          사용 완료
        </div>

        <div
          className={`absolute bottom-0 h-0.5 mainColor transition-all duration-300`}
          style={{
            width: "62px", // 밑줄 길이
            left:
              activeTab === "사용 가능"
                ? "calc(50% - 68px)"
                : "calc(50% + 8px)",
          }}
        />
      </div>
      <div className="w-full h-10 mt-10 text-center flex flex-row justify-center items-center">
        <div className=" text-2xl font-medium text-center">
          사용 가능한
          <br />
          할인권이
          <span className="subTextColor"> {dummyCoupons.length}개 </span>
          남아있어요.
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 p-4 mt-8">
        {filteredCoupons.map((coupon) => (
          <CouponMenuItem
            key={coupon.id}
            imageUrl={
              "https://cdn.pixabay.com/photo/2017/06/23/16/20/coupon-2435163_640.png"
            }
            title={coupon.title}
            date={getDDay(coupon.deadline)}
            isAvailable={coupon.isAvailable}
            onClick={() => handleCouponClick(coupon)}
          />
        ))}
      </div>
      {/* 상세 팝업 */}
      {selectedCoupon && (
        <CouponClickPopup
          coupon={selectedCoupon}
          getDDay={getDDay}
          onClose={() => setSelectedCoupon(false)}
        />
      )}
    </div>
  );
};

export default CouponPopup;
