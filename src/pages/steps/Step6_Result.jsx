import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../assets/icons/BackBtn.svg";
import SuccessChar from "../../assets/icons/Result_icon/SuccessChar.svg";
import FailChar from "../../assets/icons/Result_icon/FailChar.svg";
import PointIconStar from "../../assets/icons/Result_icon/PointIcon-star.svg";
import PointIconLine from "../../assets/icons/Result_icon/PointIcon-line.svg";
import StampIcon from "../../assets/icons/Result_icon/StampIcon.svg";
import StampProgressBar from "../../components/StampProgressBar";
import dummyStores from "../../data/dummyStores";
import { addPoint } from "../../api/addPoint";
import { useUserStore } from "../../stores/userStore";

export default function Step6_Result({ storeId, analyze, onRestart }) {
  const isSuccess = analyze?.isSuccess;
  const percent = analyze?.percent;
  const navigate = useNavigate();
  const setPoint = useUserStore((state) => state.setPoint);
  const point = useUserStore((state) => state.point);

  useEffect(() => {
    (async () => {
      try {
        await addPoint(20);
        setPoint(point + 20);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    })();
  }, []);
  // 도장 데이터: 해당 매장 인덱스
  const selectedStoreIdx = useMemo(() => {
    const idx = dummyStores.findIndex((s) => s.id === storeId);
    return idx !== -1 ? idx : null;
  }, [storeId]);

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center">
      {/* 상단바 */}
      <div className="w-full flex items-center px-6 pt-4 mb-2 relative">
        <button
          className="w-9 h-9 flex items-center justify-center"
          onClick={() => navigate("/main")}
        >
          <img src={BackBtn} alt="뒤로" className="w-7 h-7" />
        </button>
        <span className="flex-1 text-center text-gray-700 font-bold text-lg">
          식사 인증
        </span>
        {/* <button
          onClick={onRestart}
          className="w-9 h-9 rounded text-xs font-semibold text-gray-400 border border-gray-200 flex items-center justify-center"
        >
          재시작
        </button> */}
      </div>

      {/* 캐릭터+말풍선 */}
      <div className="relative flex flex-row items-center justify-center w-full px-8 mb-5 h-32">
        <div className="relative flex-shrink-0 w-28 h-28 flex items-center justify-center">
          {isSuccess ? (
            <>
              <div className="absolute w-32 h-32 bg-gradient-to-br from-yellow-100 via-green-200 to-green-300 rounded-full blur-xl opacity-60 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={SuccessChar}
                alt="성공"
                className="w-24 h-24 z-10 relative"
              />
            </>
          ) : (
            <>
              <div className="absolute w-32 h-32 bg-gradient-to-br from-gray-200 via-blue-100 to-blue-300 rounded-full blur-xl opacity-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={FailChar}
                alt="실패"
                className="w-24 h-24 z-10 relative"
              />
            </>
          )}
        </div>
        <div className="ml-4 flex flex-col relative">
          <div className="bg-white rounded-xl px-5 py-4 shadow font-bold text-gray-800 text-base text-left whitespace-pre-line relative">
            {isSuccess
              ? "덕분에 지구가\n오늘도 웃고있어요!"
              : "완식률이 부족해요.\n다음에 더 노력해볼까요?"}
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-t-transparent border-b-transparent border-r-white" />
        </div>
      </div>

      {/* 원형 게이지 + 아이콘 */}
      <div
        className="relative flex flex-col items-center mt-2 mb-4"
        style={{ width: 260, height: 260 }}
      >
        <div className="absolute right-6 top-10 z-20">
          {isSuccess ? (
            <img
              src={PointIconStar}
              alt="별"
              className="w-16 h-16 animate-bounce"
              style={{ filter: "drop-shadow(0 0 10px #ffe066)" }}
            />
          ) : (
            <img
              src={PointIconLine}
              alt="라인"
              className="w-14 h-14 opacity-80"
              style={{ filter: "drop-shadow(0 0 10px #8db5e7)" }}
            />
          )}
        </div>
        {/* 원형 게이지 */}
        <svg width={240} height={240} className="transform -rotate-90 z-10">
          <circle
            cx={120}
            cy={120}
            r={105}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={18}
          />
          <circle
            cx={120}
            cy={120}
            r={105}
            fill="none"
            stroke={isSuccess ? "#22C55E" : "#6B7280"}
            strokeWidth={18}
            strokeDasharray={2 * Math.PI * 105}
            strokeDashoffset={2 * Math.PI * 105 * (1 - (percent || 0) / 100)}
            strokeLinecap="round"
            style={{
              transition:
                "stroke-dashoffset 0.8s ease-out, stroke 0.3s ease-out",
            }}
          />
        </svg>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-6xl"
          style={{ color: isSuccess ? "#22C55E" : "#6B7280" }}
        >
          {percent}%
        </div>
        {isSuccess && (
          <img
            src={StampIcon}
            alt="스탬프"
            className="absolute right-2 bottom-2 w-24 h-24 animate-pulse z-20"
          />
        )}
      </div>

      {/* 도장(스탬프) 세트 Progress */}
      <div className="w-full px-5 mb-2">
        <div className="w-full textGrayColor text-sm mb-1">도장</div>
        {selectedStoreIdx !== null ? (
          <StampProgressBar
            selectedStoreIdx={selectedStoreIdx}
            isSuccess={isSuccess} // **성공이면 도장+1**
          />
        ) : (
          <div className="w-full bg-white rounded-3xl shadow-md p-4 flex flex-col gap-1 h-30 justify-center">
            <div className="w-full textGrayColor text-center text-sm">
              매장을 방문한 적이 없어요!
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 w-full px-6 pt-4 pb-6 mt-auto">
        <button
          className="flex-1 h-12 rounded-full bg-[#003D28] text-white font-bold"
          onClick={() => console.log("기록 클릭")}
        >
          기록
        </button>
        <button
          className="flex-1 h-12 rounded-full bg-white text-[#003D28] font-bold border border-gray-200"
          onClick={() => console.log("공유 클릭")}
        >
          공유
        </button>
      </div>
    </div>
  );
}
