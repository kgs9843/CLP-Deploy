import { useEffect, useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { useNavStore } from "../../stores/navStore";
import BottomNav from "../../components/BottomNav";
import "./QrScanner.css";

const CARD_RATIO = 9 / 19;
const MAX_W = 500;
const MIN_W = 300;

// Step1_QR: QR코드 스캔 → id 추출 → onNext(id) 호출
export default function Step1_QR({ onNext }) {
  const showNav = useNavStore((s) => s.showNav);
  const hideNav = useNavStore((s) => s.hideNav);

  // "QR 인식 딱 한 번만!" state
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const processedRef = useRef(false); // 추가: 이미 처리된 결과인지 체크

  useEffect(() => {
    showNav();
    return () => {
      hideNav();
      // 컴포넌트 언마운트 시 상태 초기화
      processedRef.current = false;
    };
  }, [showNav, hideNav]);

  // QR 결과 처리 함수
  const handleQRResult = (result) => {
    // 이미 처리 중이거나 처리된 결과면 무시
    if (isProcessing || processedRef.current || scanned) {
      return;
    }

    setIsProcessing(true);
    setScanned(true);
    processedRef.current = true;

    // 즉시 alert 표시하고 다음 단계로 진행
    // alert("QR 인식 성공! 결과: " + result);
    
    // 약간의 딜레이 후 다음 단계로 진행
    setTimeout(() => {
      onNext?.(result);
    }, 100);
  };

  // 임의 테스트 버튼 (원할 때 mock id 넘기기)
  const handleMock = () => {
    if (!isProcessing && !processedRef.current) {
      handleQRResult("테스트-QR-결과");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
      <div
        className="relative mx-auto shadow-xl flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: MAX_W,
          minWidth: MIN_W,
          aspectRatio: CARD_RATIO,
        }}
      >
        {/* 상단 '식사 인증' */}
        <div className="absolute top-20 right-6 z-30">
          <span className="text-white text-lg font-bold drop-shadow">식사 인증</span>
        </div>

        {/* 안내/진행바 */}
        <div className="absolute left-1/2 top-40 -translate-x-1/2 z-30 flex flex-col items-center w-[90%]">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <span
                  className={`block w-2 h-2 rounded-full 
                    ${i === 1 ? "bg-white/90" : "bg-white/40"}
                  `}
                />
                {i < 4 && <div className="w-8 h-[1px] bg-white/40 mx-1" />}
              </div>
            ))}
          </div>
          <span className="text-white text-xl font-bold drop-shadow mb-1">
            {isProcessing ? "처리 중..." : "QR코드를 스캔해주세요."}
          </span>
          <span className="text-white/90 text-[15px] text-center drop-shadow mb-1">
            {isProcessing ? "잠시만 기다려주세요." : (
              <>
                사각형에 QR코드를 맞춰주세요.<br />
                가게 정보가 자동으로 인식됩니다.
              </>
            )}
          </span>
        </div>

        {/* QR스캐너+마스킹+네모 */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {!scanned && (
            <QrReader
              constraints={{
                facingMode: "environment",
                width: { ideal: 1920 },
                height: { ideal: 1080 }
              }}
              onResult={(result, error) => {
                if (result?.text) {
                  handleQRResult(result.text);
                }
              }}
              style={{
                width: "100%",
                height: "100%",
                background: "black"
              }}
              videoStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                background: "black",
                transform: "scale(1.2)",
                transformOrigin: "center"
              }}
              videoContainerStyle={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden"
              }}
            />
          )}
          <OverlayWithHole />
        </div>

        {/* 하단: 버튼+네비바 */}
        <div className="absolute w-full left-0 bottom-0 flex flex-col items-center pb-4 z-40">
          {/* <button
            onClick={handleMock}
            disabled={isProcessing}
            className={`mb-30 px-8 py-3 rounded-xl font-semibold shadow-lg ${
              isProcessing 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                : "bg-[#124534] text-white"
            }`}
          >
            {isProcessing ? "처리 중..." : "확인(임의)"}
          </button> */}
          <div className="w-full">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}

// 중앙 네모 마스킹 오버레이
function OverlayWithHole() {
  const holeSize = 50; // 화면 가로세로 중 작은 값 기준 50% 크기
  const border = 4, cornerLen = 30, radius = 12;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        preserveAspectRatio="none"
      >
        {/* 마스크 정의 */}
        <defs>
          <mask id="scan-mask">
            <rect width="100%" height="100%" fill="white" />
            {/* 중앙 구멍 - 정사각형 */}
            <rect
              x={`calc(50% - ${holeSize / 2}vmin)`}
              y={`calc(50% - ${holeSize / 2}vmin)`}
              width={`${holeSize}vmin`}
              height={`${holeSize}vmin`}
              fill="black"
              rx={radius}
            />
          </mask>
        </defs>
        <g>
          <rect
            width="100%"
            height="100%"
            fill="black"
            fillOpacity="0.4"
            mask="url(#scan-mask)"
          />
          {/* 코너 네모들 */}
          {/* 좌상 */}
          <rect
            x={`calc(50% - ${holeSize / 2}vmin)`}
            y={`calc(50% - ${holeSize / 2}vmin)`}
            width={`${cornerLen}px`}
            height={`${border}px`}
            fill="#fff"
            rx={border / 2}
          />
          <rect
            x={`calc(50% - ${holeSize / 2}vmin)`}
            y={`calc(50% - ${holeSize / 2}vmin)`}
            width={`${border}px`}
            height={`${cornerLen}px`}
            fill="#fff"
            rx={border / 2}
          />
          {/* 우상 */}
          <rect
            x={`calc(50% + ${holeSize / 2}vmin - ${cornerLen}px)`}
            y={`calc(50% - ${holeSize / 2}vmin)`}
            width={`${cornerLen}px`}
            height={`${border}px`}
            fill="#fff"
            rx={border / 2}
          />
          <rect
            x={`calc(50% + ${holeSize / 2}vmin - ${border}px)`}
            y={`calc(50% - ${holeSize / 2}vmin)`}
            width={`${border}px`}
            height={`${cornerLen}px`}
            fill="#fff"
            rx={border / 2}
          />
          {/* 좌하 */}
          <rect
            x={`calc(50% - ${holeSize / 2}vmin)`}
            y={`calc(50% + ${holeSize / 2}vmin - ${cornerLen}px)`}
            width={`${border}px`}
            height={`${cornerLen}px`}
            fill="#fff"
            rx={border / 2}
          />
          <rect
            x={`calc(50% - ${holeSize / 2}vmin)`}
            y={`calc(50% + ${holeSize / 2}vmin - ${border}px)`}
            width={`${cornerLen}px`}
            height={`${border}px`}
            fill="#fff"
            rx={border / 2}
          />
          {/* 우하 */}
          <rect
            x={`calc(50% + ${holeSize / 2}vmin - ${cornerLen}px)`}
            y={`calc(50% + ${holeSize / 2}vmin - ${border}px)`}
            width={`${cornerLen}px`}
            height={`${border}px`}
            fill="#fff"
            rx={border / 2}
          />
          <rect
            x={`calc(50% + ${holeSize / 2}vmin - ${border}px)`}
            y={`calc(50% + ${holeSize / 2}vmin - ${cornerLen}px)`}
            width={`${border}px`}
            height={`${cornerLen}px`}
            fill="#fff"
            rx={border / 2}
          />
        </g>
      </svg>
    </div>
  );
}