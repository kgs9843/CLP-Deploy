import React from "react";
import UnCheckedSvg from "../assets/icons/stamp/Circle.svg";
import UnChecked5DaySvg from "../assets/icons/stamp/Circle5.svg";
import CheckedSvg from "../assets/icons/stamp/CompleteCircle.svg";
import Checked5DaySvg from "../assets/icons/stamp/CompleteCircle5.svg";
import dummyStores from "../data/dummyStores";

// 기본 stamp 템플릿 (status는 placeholder)
const baseStamps = [
  { day: 1, label: "1일차" },
  { day: 2, label: "2일차" },
  { day: 3, label: "3일차" },
  { day: 4, label: "4일차" },
  { day: 5, label: "보상\n5일차" },
  { day: 6, label: "6일차" },
  { day: 7, label: "7일차" },
  { day: 8, label: "8일차" },
  { day: 9, label: "9일차" },
  { day: 10, label: "보상\n10일차" },
  { day: 11, label: "11일차" },
  { day: 12, label: "12일차" },
  { day: 13, label: "13일차" },
  { day: 14, label: "14일차" },
  { day: 15, label: "보상\n15일차" },
];

const StampCard = ({ selectedStoreIdx }) => {
  const stampCount = dummyStores[selectedStoreIdx].stampCount;
  console.log(stampCount);
  // stampCount에 따라 status 동적으로 설정
  const dynamicStamps = baseStamps.map((stamp) => {
    if (stamp.day <= stampCount) {
      if (stamp.day % 5 === 0) {
        return { ...stamp, status: "checkedCoupon" };
      } else {
        return { ...stamp, status: "checked" };
      }
    } else if (stamp.day % 5 === 0) {
      return { ...stamp, status: "coupon" }; // 아직 도달 전인 5,10,15일차는 coupon
    } else {
      return { ...stamp, status: "unchecked" };
    }
  });

  const firstRow = dynamicStamps.slice(0, 8);
  const secondRow = dynamicStamps.slice(8);

  const getIcon = (status) => {
    if (status === "checked") return CheckedSvg;
    if (status === "checkedCoupon") return Checked5DaySvg;
    if (status === "coupon") return UnChecked5DaySvg;
    return UnCheckedSvg;
  };

  const shouldShowLabel = (status) =>
    !(status === "checked" || status === "checkedCoupon");

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
        {/* 두번째 줄은 7개만 있어야 해서 빈 div 추가 */}
        <div className="relative w-10 h-10 flex-shrink-0" />
      </div>
    </div>
  );
};

export default React.memo(StampCard);
