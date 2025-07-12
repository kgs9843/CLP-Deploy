import React, { useEffect } from "react";
import Back3DBtnIcon from "../../assets/icons/Back_3D_btn.svg";
import { useNavStore } from "../../stores/navStore";
const NotificationPopup = ({ onClose }) => {
  // 네비바 주스탠드로 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);

  useEffect(() => {
    hideNav(); // 진입시 네비 숨김
    return showNav; // 언마운트(나갈 때) 복구
  }, []);
  return (
    <div className="absolute w-full h-full inset-0 subColor flex-1 px-4 flex flex-col z-50">
      <div className="w-full h-10 mb-5 mt-15 font-bold text-2xl text-end flex flex-row justify-between">
        <img
          src={Back3DBtnIcon}
          alt="뒤로가기 버튼"
          className="w-8 h-8"
          onClick={onClose}
        />
        <div>알림</div>
      </div>
      <div className="w-full rounded-2xl bg-white h-15 flex flex-col justify-center px-3 items-start">
        <div className="w-auto h-auto font-bold text-xl">
          '구름 식당' 도장이 찍혔어요.
        </div>
        <div className="w-auto h-auto textGrayColor font-bold text-xs">
          2025-07-13
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
