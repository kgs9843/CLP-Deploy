import React from "react";
import DonateIcon from "../assets/icons/Donate.svg";
import GiftIcon from "../assets/icons/Gift.svg";
import DonateLogItem from "./DonateLoItem";

const RewardExchangeSection = ({
  donateLogs,
  setOnClickDonateBtn,
  setOnClickGiftBtn,
}) => {
  return (
    <div className=" mt-6 flex flex-col gap-4 w-full">
      {/* 상단 카드 영역 */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {/* 카드 1 */}
        <div
          className="flex flex-col items-center justify-between subColorGreen rounded-xl p-3"
          onClick={() => setOnClickGiftBtn(true)}
        >
          <div className="w-13 h-13 rounded-md bg-white flex justify-center items-center">
            <img src={GiftIcon} alt="GiftIcon" className="w-8 h-8" />
          </div>
          <div className="text-sm font-semibold mt-3">CLP 굿즈 교환</div>
          <div className="text-[10px] mt-1 textGraySubColor">
            내가 원하는 굿즈 받기
          </div>
          <button className="mt-2 text-xs bg-white subTextColor px-2 py-1 rounded-full">
            굿즈 보러가기
          </button>
        </div>

        {/* 카드 2 */}
        <div
          className="flex flex-col items-center justify-between subColorGreen rounded-xl p-3"
          onClick={() => setOnClickDonateBtn(true)}
        >
          <div className="w-13 h-13 rounded-md bg-white flex justify-center items-center">
            <img src={DonateIcon} alt="GiftIcon" className="w-8 h-8" />
          </div>
          <div className="text-sm font-semibold mt-3">환경 단체 기부</div>
          <div className="text-[10px] mt-1 textGraySubColor">
            작은 실천 실행하기
          </div>
          <button className="mt-2 text-xs bg-white subTextColor px-2 py-1 rounded-full">
            기부하러 가기
          </button>
        </div>

        {/* 카드 3 */}
        <div className="flex flex-col items-center justify-between subColorGreen rounded-xl p-3">
          <div className="w-13 h-13 rounded-md bg-white flex justify-center items-center">
            <img src={GiftIcon} alt="GiftIcon" className="w-8 h-8" />
          </div>
          <div className="text-sm font-semibold mt-3">CLP 굿즈 교환</div>
          <div className="text-[10px] mt-1 textGraySubColor">
            내가 원하는 굿즈 받기
          </div>
          <button className="mt-2 text-xs bg-white subTextColor px-2 py-1 rounded-full">
            굿즈 보러가기
          </button>
        </div>
      </div>

      {/* 하단 기부 내역 */}
      <div className="flex flex-col gap-2 mt-4 justify-center items-center">
        {donateLogs.map((log, index) => (
          <DonateLogItem
            key={index}
            log={log}
            index={index}
            bgColor="#f3f4f6"
          />
        ))}
      </div>
    </div>
  );
};

export default RewardExchangeSection;
