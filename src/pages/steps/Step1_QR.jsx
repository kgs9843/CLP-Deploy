import { useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavStore } from "../../stores/navStore";
import BottomNav from "../../components/BottomNav";

// 카드 사이즈
const CARD_RATIO = 9 / 19;
const MAX_W = 500;
const MIN_W = 300;

export default function Step1_QR({ onNext }) {
  const showNav = useNavStore((s) => s.showNav);
  const hideNav = useNavStore((s) => s.hideNav);

  useEffect(() => {
    showNav();
    return () => hideNav();
  }, [showNav, hideNav]);

  const handleMock = () => onNext?.("테스트-QR-결과");

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div
        className="relative mx-auto rounded-2xl shadow-xl flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: MAX_W,
          minWidth: MIN_W,
          aspectRatio: CARD_RATIO,
        }}
      >
        {/* 상단 '식사 인증' */}
        <div className="absolute top-6 right-6 z-30">
          <span className="text-white text-lg font-bold drop-shadow">
            식사 인증
          </span>
        </div>

        {/* 안내/진행바 */}
        <div className="absolute left-1/2 top-14 -translate-x-1/2 z-30 flex flex-col items-center w-[90%]">
          <div className="flex items-center w-[140px] h-3 mb-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full mx-[6px] 
                  ${i === 1 ? "bg-white/90" : "bg-white/40"}
                `}
              />
            ))}
          </div>
          <span className="text-white text-lg font-bold drop-shadow mb-1 mt-1">
            QR코드를 스캔해주세요.
          </span>
          <span className="text-white/90 text-[15px] text-center drop-shadow mb-1">
            사각형에 QR코드를 맞춰주세요.
            <br />
            가게 정보가 자동으로 인식됩니다.
          </span>
        </div>

        {/* QR스캐너+마스킹+네모 */}
        <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
          <Scanner
            onResult={(result) => {
              if (result?.text) onNext?.(result.text);
            }}
            constraints={{ facingMode: "environment" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem", // Tailwind rounded-2xl
              background: "black",
            }}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
            hideBorder={true} // 기본 빨간 라인 완전 OFF
            isShowScanningLine={false}
          />
          <OverlayWithHole />
        </div>

        {/* 하단: 버튼+네비바 */}
        <div className="absolute w-full left-0 bottom-0 flex flex-col items-center pb-4 z-40">
          <button
            onClick={handleMock}
            className="mb-2 px-8 py-3 bg-[#124534] text-white rounded-xl font-semibold shadow-lg"
          >
            확인(임의)
          </button>
          <div className="w-full">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Overlay with transparent rounded-rect hole + thick white corners
 */
function OverlayWithHole() {
  // 카드 중앙, 240x240, 둥근 모서리
  const holeW = 240,
    holeH = 240,
    border = 7,
    cornerLen = 36,
    radius = 22;
  const centerY = "44%"; // 중앙 맞출 때 여기만 미세 조정

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 네모 투명 빵꾸 (정중앙, 둥근모서리) */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
      >
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x="50%"
              y={centerY}
              width={holeW}
              height={holeH}
              fill="black"
              rx={radius}
              style={{
                transform: `translate(-50%,-50%)`,
              }}
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="black"
          fillOpacity="0.4"
          mask="url(#mask)"
        />
      </svg>
      {/* 네모 하얀 테두리(모서리만, 두껍게) */}
      <svg
        style={{
          position: "absolute",
          left: "50%",
          top: centerY,
          transform: "translate(-50%, -50%)",
          width: `${holeW}px`,
          height: `${holeH}px`,
          zIndex: 3,
        }}
        width={holeW}
        height={holeH}
      >
        {/* 네 귀퉁이 */}
        {/* 좌상 */}
        <rect
          x="0"
          y="0"
          width={cornerLen}
          height={border}
          fill="#fff"
          rx={border}
        />
        <rect
          x="0"
          y="0"
          width={border}
          height={cornerLen}
          fill="#fff"
          rx={border}
        />
        {/* 우상 */}
        <rect
          x={holeW - cornerLen}
          y="0"
          width={cornerLen}
          height={border}
          fill="#fff"
          rx={border}
        />
        <rect
          x={holeW - border}
          y="0"
          width={border}
          height={cornerLen}
          fill="#fff"
          rx={border}
        />
        {/* 좌하 */}
        <rect
          x="0"
          y={holeH - cornerLen}
          width={border}
          height={cornerLen}
          fill="#fff"
          rx={border}
        />
        <rect
          x="0"
          y={holeH - border}
          width={cornerLen}
          height={border}
          fill="#fff"
          rx={border}
        />
        {/* 우하 */}
        <rect
          x={holeW - cornerLen}
          y={holeH - border}
          width={cornerLen}
          height={border}
          fill="#fff"
          rx={border}
        />
        <rect
          x={holeW - border}
          y={holeH - cornerLen}
          width={border}
          height={cornerLen}
          fill="#fff"
          rx={border}
        />
      </svg>
    </div>
  );
}
