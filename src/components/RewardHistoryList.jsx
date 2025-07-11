import React, { useEffect } from "react";
const RewardHistoryList = ({
  data,
  selectedYear,
  selectedMonth,
  setEarnedPoint,
  setDeductedPoint,
  activeMenu,
}) => {
  // selectedMonth는 1~12 숫자라고 가정
  const filteredData = data
    .filter((item) => {
      const dateObj = new Date(item.date);
      return (
        dateObj.getFullYear() === selectedYear &&
        dateObj.getMonth() + 1 === selectedMonth
      );
    })
    .filter((item) => {
      if (activeMenu === "전체") return true;
      return item.type === activeMenu;
    });

  // 합계 계산
  useEffect(() => {
    const earned = filteredData
      .filter((item) => item.point > 0)
      .reduce((sum, item) => sum + item.point, 0);

    const deducted = filteredData
      .filter((item) => item.point < 0)
      .reduce((sum, item) => sum + Math.abs(item.point), 0); // 절대값으로 합계

    setEarnedPoint(earned);
    setDeductedPoint(deducted);
  }, [filteredData, setEarnedPoint, setDeductedPoint]);

  return (
    <div className="flex flex-col divide-y">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className=" flex flex-row justify-between items-center py-4"
          >
            {/* 왼쪽 완료율 */}
            <div className="flex flex-col items-center min-w-[60px]">
              <div className="text-xs textGrayColor">완식률</div>
              <div className="text-xl font-bold">
                {item.completion === 0 ? (
                  "X"
                ) : (
                  <>
                    {item.completion}
                    <span className="text-xs">%</span>
                  </>
                )}
              </div>
            </div>

            {/* 가운데 제목과 날짜 */}
            <div className="flex-1 flex flex-col px-2">
              <div className="text-md font-bold">{item.title}</div>
              <div className="text-xs textGrayColor">{item.date}</div>
            </div>

            {/* 오른쪽 포인트 및 타입 */}
            <div className="flex flex-col items-end min-w-[60px]">
              <div
                className={`text-base ${
                  item.point < 0 ? "text-red-500" : "text-black"
                }`}
              >
                <div className="flex flex-row gap-1 text-xl">
                  <div className="font-extrabold">{item.point}</div>P
                </div>
              </div>
              <div className="text-xs textGrayColor">{item.type}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center textGrayColor">데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default React.memo(RewardHistoryList);
