import React, { useEffect, useState } from "react";

export default function Step5_Analyze({ bowl, food, onFinish }) {
  const [percent, setPercent] = useState(0);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (!bowl) return; // 예외 처리!
    let p = 0;
    const timer = setInterval(() => {
      p += Math.floor(Math.random() * 5) + 5;
      if (p >= 80) {
        setPercent(80);
        clearInterval(timer);
        setTimeout(() => {
          setScanning(false);
          onFinish && onFinish({ percent: 80, isSuccess: true, image: bowl });
        }, 1200);
      } else {
        setPercent(p);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [onFinish, bowl]);

  if (!bowl) return <div className="text-center py-12">이미지가 없습니다.</div>;

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F5F5F5]">
      <div className="w-full flex items-center px-6 pt-4 mb-2">
        <span className="w-9" />
        <span className="flex-1 text-center text-gray-700 font-bold text-lg">식사 인증</span>
        <span className="w-9" />
      </div>
      <div className="flex flex-col grow items-center justify-center">
        <div className="flex flex-col items-center mb-6">
          <svg width={64} height={64} className="mb-2">
            <circle cx={32} cy={32} r={28} fill="none" stroke="#D1FAE5" strokeWidth={8} />
            <circle
              cx={32}
              cy={32}
              r={28}
              fill="none"
              stroke="#10B981"
              strokeWidth={8}
              strokeDasharray={176}
              strokeDashoffset={176 - (percent / 100) * 176}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.2s" }}
            />
          </svg>
          <div className="font-bold text-2xl text-green-700">{percent}%</div>
          <div className="text-gray-600 text-center text-base mt-2 mb-2">
            완식 여부를 확인중입니다.<br />잠시만 기다려주세요.
          </div>
        </div>
        <div className="w-72 h-72 relative rounded-xl overflow-hidden shadow">
          <img src={bowl.url} alt="plate" className="object-cover w-full h-full" />
          {scanning && (
            <div className="absolute inset-0 pointer-events-none">
              <ScanEffect />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 스캔 애니메이션
function ScanEffect() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    let raf;
    const animate = () => {
      setPos((prev) => (prev < 100 ? prev + 2 : 0));
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      style={{
        top: `${pos}%`,
        left: 0,
        width: "100%",
        height: "30%",
        position: "absolute",
        background: "linear-gradient(180deg, rgba(255,255,255,0.7), transparent 90%)",
        pointerEvents: "none",
        transition: "top 0.08s linear"
      }}
    />
  );
}