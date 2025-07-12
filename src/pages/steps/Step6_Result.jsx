import React, { useState } from "react";

// 실제 SVG 파일 import
import SuccessChar from "../../assets/icons/Result_icon/SuccessChar.svg";
import FailChar from "../../assets/icons/Result_icon/FailChar.svg";
import PointIconStar from "../../assets/icons/Result_icon/PointIcon-star.svg";
import PointIconLine from "../../assets/icons/Result_icon/PointIcon-line.svg";
import StampIcon from "../../assets/icons/Result_icon/StampIcon.svg";

export default function Step6_Result() {
  const [percent, setPercent] = useState(80);
  const [demoMode, setDemoMode] = useState('success'); // 'success' or 'fail'

  // 성공/실패 판정
  const isSuccess = percent >= 80;

  const handleToggleDemo = () => {
    if (demoMode === 'success') {
      setDemoMode('fail');
      setPercent(60);
    } else {
      setDemoMode('success');
      setPercent(80);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center">
      {/* 상단 바 */}
      <div className="w-full flex items-center px-6 pt-4 mb-2">
        <span className="w-9" />
        <span className="flex-1 text-center text-gray-700 font-bold text-lg">식사 인증</span>
        <button 
          onClick={handleToggleDemo}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-600"
        >
          {demoMode === 'success' ? '실패' : '성공'}
        </button>
      </div>

      {/* 진행바 */}
      <div className="flex items-center justify-center gap-2 mb-4 mt-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center">
            <span className={`block w-2 h-2 rounded-full ${i === 4 ? "bg-green-700" : "bg-gray-300"}`} />
            {i < 4 && <div className="w-8 h-[1px] bg-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      {/* 캐릭터와 말풍선 영역 */}
      <div className="relative w-full flex items-center justify-center px-6 mb-8">
        {/* 캐릭터 - 왼쪽에 위치 */}
        <div className="relative">
          {isSuccess ? (
            <div className="relative">
              {/* 성공 시 배경 효과 */}
              <div className="absolute inset-0 w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-200 via-green-200 to-green-300 rounded-full blur-xl opacity-60"></div>
              {/* SuccessChar 캐릭터 */}
              <img src={SuccessChar} alt="성공" className="w-24 h-24 drop-shadow-lg relative z-10" />
            </div>
          ) : (
            <div className="relative">
              {/* 실패 시 배경 효과 */}
              <div className="absolute inset-0 w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-300 via-blue-200 to-blue-300 rounded-full blur-xl opacity-50"></div>
              {/* FailChar 캐릭터 */}
              <img src={FailChar} alt="실패" className="w-24 h-24 drop-shadow-lg relative z-10" />
            </div>
          )}
        </div>

        {/* 말풍선 - 캐릭터 오른쪽에 위치 */}
        <div className="ml-4 relative">
          <div className="bg-white rounded-xl px-4 py-3 text-center shadow-lg font-bold text-gray-800 text-sm leading-tight">
            {isSuccess
              ? "덕분에 지구가\n오늘도 웃고있어요!"
              : "완식률이 부족해요.\n다음에 더 노력해볼까요?"}
          </div>
          {/* 말풍선 꼬리 - 왼쪽으로 향함 */}
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-white"></div>
        </div>
      </div>

      {/* 원형 게이지 영역 */}
      <div className="relative w-full flex flex-col items-center">

        {/* 원형 게이지와 아이콘들 */}
        <div className="relative flex flex-col items-center mt-4 mb-6">
          {/* 성공 시 별 아이콘 - 원형 게이지 위쪽에 위치 */}
          {isSuccess && (
            <img 
              src={PointIconStar} 
              alt="별" 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 animate-bounce z-20"
              style={{ filter: "drop-shadow(0 0 8px #ffe066)" }}
            />
          )}
          
          {/* 실패 시 라인 아이콘 - 원형 게이지 위쪽에 위치 */}
          {!isSuccess && (
            <img 
              src={PointIconLine} 
              alt="라인" 
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-9 h-9 opacity-80 z-20"
              style={{ filter: "drop-shadow(0 0 8px #8db5e7)" }}
            />
          )}
          
          <svg width={180} height={180} className="transform -rotate-90">
            <circle
              cx={90}
              cy={90}
              r={80}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={12}
            />
            <circle
              cx={90}
              cy={90}
              r={80}
              fill="none"
              stroke={isSuccess ? "#22C55E" : "#6B7280"}
              strokeWidth={12}
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - percent / 100)}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.8s ease-out, stroke 0.3s ease-out"
              }}
            />
          </svg>
          
          {/* 퍼센트 텍스트 */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-4xl transition-colors duration-300`}
            style={{ color: isSuccess ? "#22C55E" : "#6B7280" }}>
            {percent}%
          </div>
          
          {/* 스탬프 아이콘 - 원형 게이지 오른쪽에 걸쳐져 있도록 배치 */}
          {isSuccess && (
            <img 
              src={StampIcon} 
              alt="스탬프" 
              className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 animate-pulse z-20"
            />
          )}
        </div>
      </div>

      {/* 아래 도장/포인트 현황 */}
      <div className="w-full px-5 mt-2">
        <div className="text-xs text-gray-500 mb-2">
          현재 1회 방문 중 <b className="text-green-600">4회</b> 더 방문하면 쿠폰 지급!
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-lg mb-4 relative overflow-hidden">
          <div
            className={`h-2 rounded-lg transition-all duration-500 ${isSuccess ? 'bg-green-400' : 'bg-gray-400'}`}
            style={{ width: `${Math.min(percent / 5, 100)}%` }}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 w-full px-6 pt-6 pb-6 mt-auto">
        <button
          className="flex-1 h-12 rounded-full bg-green-700 text-white font-bold shadow-lg hover:bg-green-800 transition-colors"
          onClick={() => console.log('기록 클릭')}
        >
          기록
        </button>
        <button
          className="flex-1 h-12 rounded-full bg-gray-100 text-green-700 font-bold shadow-lg hover:bg-gray-200 transition-colors"
          onClick={() => console.log('공유 클릭')}
        >
          공유
        </button>
      </div>
    </div>
  );
}