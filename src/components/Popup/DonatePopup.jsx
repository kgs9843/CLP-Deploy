import React, { useState, useEffect } from "react";
import Back3DBtnIcon from "../../assets/icons/Back_3D_btn.svg";
import PointButton from "../PointButton";
import PigPNG from "../../assets/pig.png";
import DonateLogItem from "../DonateLoItem";
import DonateDecidePopup from "./DonateDecidePopup";
import { useNavStore } from "../../stores/navStore";
const DonatePopup = ({ onClose, point, donateLogs }) => {
  const [donateDecidePopup, setDonateDecidePopup] = useState(false);
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
        <div>환경 단체 기부</div>
      </div>
      <div className="w-full h-10 mt-10 text-end flex flex-row justify-between">
        <div className=" text-2xl font-extrabold text-start">
          작은 포인트가 모여, <br />
          <span className="subTextColor">큰 희망</span>이 됩니다.
        </div>
        <div>
          <PointButton point={point} />
        </div>
      </div>
      <div className="mt-8 text-sm textGrayColor">
        당신이 남긴 20p가 누군가에게는 따뜻한 위로가 됩니다.
        <br /> 지금까지 모인 포인트, 기부처에 전달됩니다.
      </div>
      <img src={PigPNG} alt="돼지저금통" className="mt-10 w-80 mx-auto" />
      {/* 하단 기부 내역 */}
      <div className="flex flex-col gap-2 justify-center items-center mt-8">
        {donateLogs.map((log, index) => (
          <DonateLogItem key={index} log={log} index={index} />
        ))}
      </div>
      <div
        className="text-sm mt-8 text-white w-full rounded-full mainColor h-8 flex justify-center items-center cursor-pointer"
        onClick={() => setDonateDecidePopup(true)}
      >
        20 p 기부하기
      </div>

      {donateDecidePopup && (
        <DonateDecidePopup onClose={() => setDonateDecidePopup(false)} />
      )}
    </div>
  );
};

export default DonatePopup;
