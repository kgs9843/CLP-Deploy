import { useState } from "react";
import Step1_QR from "./steps/Step1_QR";
import Step2_Map from "./steps/Step2_Map";
import Step3_FoodUpload from "./steps/Step3_FoodUpload";
import Step4_PlateUpload from "./steps/Step4_PlateUpload";
import Step5_Analyze from "./steps/Step5_Analyze";
import Step6_Result from "./steps/Step6_Result";

const TOTAL_STEP = 6;

export default function FoodProcess() {
  const [step, setStep] = useState(1);
  const [qrResult, setQrResult] = useState(null);
  const [place, setPlace] = useState(null);
  const [foodPhoto, setFoodPhoto] = useState(null);
  const [bowlPhoto, setBowlPhoto] = useState(null);
  const [analyze, setAnalyze] = useState({ percent: null, isSuccess: null });

  // 진행률 계산
  const progress = ((step - 1) / (TOTAL_STEP - 1)) * 100;

  return (
    <div className="w-full max-w-[500px] min-w-[300px] bg-white shadow-xl rounded-xl p-0 overflow-hidden mx-auto flex flex-col">
      {/* 진행률 바 */}
      <div className="h-2 bg-gray-200 w-full">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* 단계별 컴포넌트 */}
      {step === 1 && (
        <Step1_QR
          onNext={(data) => {
            setQrResult(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2_Map
          qrResult={qrResult}
          onNext={(data) => {
            setPlace(data);
            setStep(3);
          }}
          onPrev={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3_FoodUpload
          onNext={(photo) => {
            setFoodPhoto(photo);
            setStep(4);
          }}
          onPrev={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4_PlateUpload
          onNext={photo => {
            setBowlPhoto(photo);
            setStep(5);
          }}
          onPrev={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <Step5_Analyze
          food={foodPhoto}
          bowl={bowlPhoto}
          onFinish={(result) => {
            setAnalyze(result); // { percent, isSuccess }
            setStep(6);
          }}
        />
      )}
      {step === 6 && (
        <Step6_Result
          storeId={qrResult}         // **여기서 QR 결과 넘김**
          analyze={analyze}          // {percent, isSuccess}
          onRestart={() => {
            setStep(1);
            setQrResult(null);
            setPlace(null);
            setFoodPhoto(null);
            setBowlPhoto(null);
            setAnalyze({ percent: null, isSuccess: null });
          }}
        />
      )}
    </div>
  );
}
