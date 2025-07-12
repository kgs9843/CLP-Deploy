import React, { useState } from "react";
import StepUploadImage from "../../components/StepUploadImage";

export default function Step4_PlateUpload({ onNext, onPrev, onHome }) {
  const [image, setImage] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <StepUploadImage
        title="접시 상태를 업로드해주세요."
        guide={"식사를 완료한 접시를 업로드해주세요.\n사진을 기반으로 AI 분석이 이루어집니다."}
        step={3}
        totalStep={4}
        uploadGuide="업로드"
        circle={false} // 사각형!
        onPrev={onPrev}
        onImageSelect={setImage}
      />
      {image && (
        <div className="flex gap-2 w-full px-6 pt-6 pb-4 mt-auto">
          <button
            className="flex-1 h-12 rounded-full bg-white border text-gray-700 font-bold shadow"
            onClick={onHome}
          >
            홈으로
          </button>
          <button
            className="flex-1 h-12 rounded-full bg-green-700 text-white font-bold shadow"
            onClick={() => onNext(image)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
