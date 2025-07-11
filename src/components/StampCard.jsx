import React, { useState, useEffect } from "react";
import dummyStores from "../data/dummyStores";
import UnCheckedSvg from "../assets/icons/stamp/Circle.svg";
import UnChecked5DaySvg from "../assets/icons/stamp/Circle5.svg";
import CheckedSvg from "../assets/icons/stamp/CompleteCircle.svg";
import Checked5DaySvg from "../assets/icons/stamp/CompleteCircle5.svg";

const stamps = [
  { day: 1, status: "checked", label: "1일차" },
  { day: 2, status: "checked", label: "2일차" },
  { day: 3, status: "checked", label: "3일차" },
  { day: 4, status: "checked", label: "4일차" },
  { day: 5, status: "checkedCoupon", label: "보상\n5일차" },
  { day: 6, status: "unchecked", label: "6일차" },
  { day: 7, status: "unchecked", label: "7일차" },
  { day: 8, status: "unchecked", label: "8일차" },
  { day: 9, status: "unchecked", label: "9일차" },
  { day: 10, status: "coupon", label: "보상\n10일차" },
  { day: 11, status: "unchecked", label: "11일차" },
  { day: 12, status: "unchecked", label: "12일차" },
  { day: 13, status: "unchecked", label: "13일차" },
  { day: 14, status: "unchecked", label: "14일차" },
  { day: 15, status: "coupon", label: "보상\n15일차" },
];

const StampCard = ({ selectedStoreIdx }) => {
  // 2줄로 나누기
  const firstRow = stamps.slice(0, 8);
  const secondRow = stamps.slice(8);

  // status에 따른 아이콘 선택 함수
  const getIcon = (status) => {
    if (status === "checked") return CheckedSvg;
    if (status === "checkedCoupon") return Checked5DaySvg;
    if (status === "coupon") return UnChecked5DaySvg;
    return UnCheckedSvg;
  };
  const shouldShowLabel = (status) => {
    return !(status === "checked" || status === "checkedCoupon");
  };

  return (
    <div className="mt-3 w-full bg-white rounded-2xl shadow-md p-2 py-4 flex flex-col gap-2 justify-center">
      {/* 첫째 줄 */}
      <div className="flex flex-row justify-between gap-[2px]">
        {firstRow.map((stamp) => (
          <div key={stamp.day} className="relative w-10 h-10 flex-shrink-0">
            <img
              src={getIcon(stamp.status)}
              alt={stamp.label}
              className="w-full h-full"
            />
            {shouldShowLabel(stamp.status) && (
              <span className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-semibold textGraySubColor2 text-center leading-tight px-1">
                {stamp.label.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== stamp.label.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 둘째 줄 */}
      <div className="flex flex-row justify-between mt-1 gap-[2px]">
        {secondRow.map((stamp) => (
          <div key={stamp.day} className="relative w-10 h-10 flex-shrink-0">
            <img
              src={getIcon(stamp.status)}
              alt={stamp.label}
              className="w-full h-full"
            />
            {shouldShowLabel(stamp.status) && (
              <span className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-semibold textGraySubColor2 text-center leading-tight px-1">
                {stamp.label.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== stamp.label.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            )}
          </div>
        ))}
        <div className="relative w-10 h-10 flex-shrink-0" />
      </div>
    </div>
  );
};

export default React.memo(StampCard);
