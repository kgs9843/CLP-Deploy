import React from "react";
import DonateIcon from "../assets/icons/Donate.svg";

const DonateLogItem = ({ log, index, bgColor = "#FFF" }) => {
  // 최소 폰트 사이즈와 높이, opacity 한계 설정
  const fontSize = Math.max(8, 12 - index * 2); // 12px부터 -2씩 줄이되 최소 8px
  const height = Math.max(24, 40 - index * 8); // 40px부터 -8씩 줄이되 최소 24px
  const opacity = Math.max(0.2, 1 - index * 0.35); // 1부터 -0.35씩 줄이되 최소 0.2
  const leftPos = 6 + index * 6; // left 위치를 더 극적으로 이동

  return (
    <div
      className="flex flex-row items-center justify-center rounded-full py-2 transition-all duration-300 relative"
      style={{
        backgroundColor: bgColor,
        width: `${100 - index * 10}%`, // 너비 점점 작아짐
        marginBottom: `${index - 1}px`, // 마진 조절
        height: `${height}px`,
        opacity: opacity,
        fontSize: `${fontSize}px`, // 폰트 크기 적용
      }}
    >
      <div
        className="absolute w-6 h-6 rounded-full bg-white flex justify-center items-center"
        style={{
          left: `${leftPos}px`,
        }}
      >
        <img
          src={DonateIcon}
          alt="DonateIcon"
          className="w-4 h-4 opacity-80 "
        />
      </div>
      <div className="text-gray-600" style={{ fontSize: `${fontSize}px` }}>
        <span className="font-semibold subTextColor ">{log.name}</span>
        님이 {log.point}P를 환경 단체에 기부하셨습니다.
      </div>
    </div>
  );
};

export default DonateLogItem;
