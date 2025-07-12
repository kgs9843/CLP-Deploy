import React from "react";
import StepUploadImage from "../../components/StepUploadImage";

export default function Step4_PlateUpload({ onNext, onPrev, onHome }) {
  return (
    <StepUploadImage
      title="접시 상태를 업로드해주세요."
      guide={"식사를 완료한 접시를 업로드해주세요.\n사진을 기반으로 AI 분석이 이루어집니다."}
      step={3}
      totalStep={4}
      circle={false} // 사각형 미리보기!
      onPrev={onPrev}
      onNext={onNext}
      onHome={onHome}
    />
  );
}
