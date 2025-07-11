export default function Step6_Result({ analyze, onRestart }) {
  const { percent, isSuccess } = analyze;

  return (
    <div className="p-6 flex flex-col h-[630px] items-center justify-center">
      <div className="font-bold text-lg mb-4">
        {isSuccess
          ? "덕분에 지구가 오늘도 웃고 있어요!"
          : "완식률이 부족해요. 다음에 더 노력해볼까요?"}
      </div>
      <div className="relative mb-3">
        <svg width="130" height="130">
          <circle
            cx="65"
            cy="65"
            r="56"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="65"
            cy="65"
            r="56"
            stroke="#34D399"
            strokeWidth="12"
            fill="none"
            strokeDasharray={2 * Math.PI * 56}
            strokeDashoffset={2 * Math.PI * 56 * (1 - (percent || 0) / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s" }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl font-bold text-green-600">
          {percent}%
        </div>
      </div>
      <button
        className="w-full h-12 rounded-lg bg-green-700 text-white font-bold mt-5"
        onClick={onRestart}
      >
        처음부터 다시
      </button>
    </div>
  );
}
