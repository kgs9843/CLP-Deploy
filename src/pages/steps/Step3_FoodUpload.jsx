import React from "react";
import StepUploadImage from "../../components/StepUploadImage";
// import { useNavigate } from "react-router-dom";

export default function Step3_FoodUpload({ onNext, onPrev, onHome }) {
  // 실제 사용 시 onNext/onPrev/onHome props로 라우팅 또는 이동 함수 넘겨줄 것
  return (
    <StepUploadImage
      title="음식을 업로드해주세요."
      guide={"주문한 음식을 업로드해주세요.\n사진을 기반으로 AI 분석이 이루어집니다."}
      step={2}
      totalStep={4}
      uploadGuide="업로드"
      circle={true} // 원형 미리보기
      onPrev={onPrev}
      onNext={onNext}
      onHome={onHome}
    />
  );
}
