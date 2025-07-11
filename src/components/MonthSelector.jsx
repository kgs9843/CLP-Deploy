import React, { useState } from "react";
import LeftArrowIcon from "../assets/icons/LeftArrow.svg";
import RightArrowIcon from "../assets/icons/RightArrow.svg";
import DownTriangleArrowIcon from "../assets/icons/DownTriangleArrow.svg";

const MonthSelector = ({
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  currentYear,
  currentMonth,
  minYear,
  minMonth,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const isCurrentMonth =
    selectedYear === currentYear && selectedMonth === currentMonth;
  const isMinMonth = selectedYear === minYear && selectedMonth === minMonth;

  const years = [];
  for (let y = minYear; y <= currentYear; y++) years.push(y);

  const goPrevMonth = () => {
    if (isMinMonth) return;
    if (selectedMonth === 1) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const goNextMonth = () => {
    if (isCurrentMonth) return;
    if (selectedMonth === 12) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const isMonthDisabled = (year, month) =>
    (year === currentYear && month > currentMonth) ||
    (year === minYear && month < minMonth);

  return (
    <div className="relative flex flex-col">
      {/* 기존 화살표 + 연도+월 */}
      <div className="flex flex-row gap-4 items-center">
        <img
          src={LeftArrowIcon}
          className={`w-4 h-4 cursor-pointer ${
            isMinMonth ? "opacity-30 cursor-not-allowed" : ""
          }`}
          onClick={goPrevMonth}
        />
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          {/* <div className="text-xl font-bold">{selectedYear}년</div> */}
          <div className="text-xl font-bold">{selectedMonth}월</div>
          <img src={DownTriangleArrowIcon} alt="▼" className="w-2 h-2" />
        </div>
        <img
          src={RightArrowIcon}
          className={`w-4 h-4 cursor-pointer ${
            isCurrentMonth ? "opacity-30 cursor-not-allowed" : ""
          }`}
          onClick={goNextMonth}
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-45 bg-white rounded shadow-md z-20 flex flex-col py-2 justify-center items-center">
          <div className="flex h-10 w-full justify-between px-5 items-center gap-2 mb-2 border-b-1 border-gray-300">
            <div className="font-semibold">{selectedYear}년</div>
            <div className="flex flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedYear((prev) => Math.max(prev - 1, minYear));
                  setSelectedMonth(1);
                }}
                disabled={selectedYear === minYear}
                className={`
                    ${
                      selectedYear === minYear
                        ? "textGraySubColor "
                        : "subTextColor"
                    }
                  `}
              >
                &lt;
              </button>
              <button
                onClick={() => {
                  setSelectedYear((prev) => Math.min(prev + 1, currentYear));
                  setSelectedMonth(1);
                }}
                disabled={selectedYear === currentYear}
                className={`
                    ${
                      selectedYear === currentYear
                        ? "textGraySubColor "
                        : "subTextColor"
                    }
                  `}
              >
                &gt;
              </button>
            </div>
          </div>

          {/* 월 그리드 */}
          <div className="grid grid-cols-3 gap-2 gap-x-6 w-auto justify-center items-center">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
              const disabled = isMonthDisabled(selectedYear, month);
              const isSelected =
                month === selectedMonth && selectedYear === selectedYear;

              return (
                <button
                  key={month}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedMonth(month);
                    setShowDropdown(false);
                  }}
                  className={`py-1 w-8 text-sm font-bold rounded ${
                    isSelected
                      ? "subColorGreen subTextColor"
                      : "bg-white textGraySubColor2 "
                  } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
                >
                  {month}월
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MonthSelector);
