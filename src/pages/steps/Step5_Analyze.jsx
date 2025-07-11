import { useEffect } from "react";

export default function Step5_Analyze({ food, bowl, onFinish }) {
  useEffect(() => {
    // 1초 뒤 "분석" 완료 처리 (임시)
    const timer = setTimeout(() => {
      onFinish({
        percent: 80, // 샘플
        isSuccess: true,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="p-6 flex flex-col h-[630px] items-center justify-center">
      <div className="font-bold text-lg mb-5">AI가 분석 중입니다...</div>
      <div className="w-32 h-32 rounded-full border-8 border-green-400 border-t-gray-200 animate-spin mb-4"></div>
      <div className="text-gray-600 text-center">잠시만 기다려주세요.</div>
    </div>
  );
}
