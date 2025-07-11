import React, { useEffect } from "react";
import Back3DBtnIcon from "../../assets/icons/Back_3D_btn.svg";
import { useNavStore } from "../../stores/navStore";
import MyPageMenuItem from "../MyPageMenuItem";
const noticeItems = [
  { title: "첫번째 공지사항", date: "2025-07-01" },
  { title: "두번째 공지사항", date: "2025-07-05" },
  // 필요시 더 추가
];
const NoticePopup = ({ onClose }) => {
  // 네비바 주스탠드로 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);

  useEffect(() => {
    hideNav(); // 진입시 네비 숨김
    return showNav; // 언마운트(나갈 때) 복구
  }, []);
  return (
    <div className="absolute w-full h-full inset-0 subColor flex-1 px-4 flex flex-col z-50">
      <div className="w-full h-10 mt-15 font-bold text-2xl text-end flex flex-row justify-between">
        <img
          src={Back3DBtnIcon}
          alt="뒤로가기 버튼"
          className="w-8 h-8"
          onClick={onClose}
        />
        <div>공지사항</div>
      </div>
      <div className="w-full flex flex-col gap-4 mt-10">
        {noticeItems.map((item, idx) => (
          <MyPageMenuItem key={idx} title={item.title} subtitle={item.date} />
        ))}
      </div>
    </div>
  );
};

export default NoticePopup;
