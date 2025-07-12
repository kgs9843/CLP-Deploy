import React, { useState, useEffect } from "react";
import dummyStores from "../data/dummyStores";

const StampProgressBar = ({ selectedStoreIdx, isSuccess }) => {
  const [lastStampedDiffText, setLastStampedDiffText] = useState("");

  useEffect(() => {
    if (selectedStoreIdx === null) {
      setLastStampedDiffText("");
      return;
    }

    const store = dummyStores[selectedStoreIdx];
    if (!store || !store.lastStampedAt) {
      setLastStampedDiffText("날짜 정보 없음");
      return;
    }

    // "2025-07-05 14:32" -> "2025-07-05T14:32"
    const lastStampedAt = new Date(store.lastStampedAt.replace(" ", "T"));
    const now = new Date();

    const diffTime = now.getTime() - lastStampedAt.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) setLastStampedDiffText("오늘 완료");
    else setLastStampedDiffText(`${diffDays}일 전 완료`);
  }, [selectedStoreIdx]);

  // 기존 도장 개수
  const baseCount =
    selectedStoreIdx !== null
      ? dummyStores[selectedStoreIdx].stampCount ?? 0
      : 0;
  // 성공이면 UI상으로만 +1
  const displayCount = isSuccess ? baseCount + 1 : baseCount;

  return (
    <div className="mt-3 w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-1 h-30 justify-center">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start gap-3 items-center">
          <span className="text-gray-700 text-sm font-semibold">
            완식 스템프
          </span>
          <span className="text-black text-sm font-bold">
            {displayCount}개
          </span>
        </div>
        <div className="text-xs mainColor text-white rounded-2xl px-2">
          {lastStampedDiffText}
        </div>
      </div>

      {/* 프로그래스 바 */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
        <div
          className="h-full mainColor rounded-full transition-all duration-500"
          style={{
            width: `${(displayCount / 15) * 100}%`,
          }}
        ></div>

        <div
          className="absolute top-0 h-3 w-px bg-gray-400"
          style={{
            left: `33.3%`,
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute top-0 h-3 w-px bg-gray-400"
          style={{
            left: `65%`,
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div className="relative mt-1 w-full flex justify-between text-[10px] text-gray-500">
        <span>1개</span>
        <span>5개</span>
        <span>10개</span>
        <span>15개</span>
      </div>
    </div>
  );
};

export default React.memo(StampProgressBar);
