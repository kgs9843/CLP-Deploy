import React, { useRef, useState } from "react";
import BackBtn from "../assets/icons/BackBtn.svg";
import UploadIcon from "../assets/icons/Upload-icon.svg";

function StepProgress({ current = 2, total = 4 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <span
            className={`block w-2 h-2 rounded-full 
              ${i + 1 === current ? "bg-green-700" : "bg-gray-300"}
            `}
          />
          {i < total - 1 && <div className="w-8 h-[1px] bg-gray-300 mx-1" />}
        </div>
      ))}
    </div>
  );
}

export default function StepUploadImage({
  title = "이미지를 업로드해주세요.",
  guide = "",
  step = 2,
  totalStep = 4,
  circle = false,   // ★ 원형/사각형 옵션
  onImageSelect,
  onPrev,
  onNext,
  onHome,
  image: imageProp,
}) {
  const [image, setImage] = useState(imageProp || null);
  const fileInputRef = useRef(null);

  // 이미지 업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const imageObj = { file, url };
    setImage(imageObj);
    if (onImageSelect) onImageSelect(imageObj); // 반드시 호출!
  };

  const handleUploadClick = () => {
    fileInputRef.current.accept = "image/*";
    fileInputRef.current.removeAttribute("capture");
    fileInputRef.current.click();
  };

  // 미리보기(프리뷰) 상태라면
  if (image) {
    return (
      <div className="relative w-full min-h-screen bg-[#F5F5F5] flex flex-col">
        {/* 상단 바 */}
        <div className="w-full flex items-center px-6 pt-4 mb-2">
          <button className="w-9 h-9 flex items-center justify-center" onClick={onPrev}>
            <img src={BackBtn} alt="뒤로" className="w-7 h-7" />
          </button>
          <span className="flex-1 text-center text-gray-700 font-bold text-lg">식사 인증</span>
          <span className="w-9" />
        </div>

        {/* 중앙 컨텐츠(이미지/글씨) */}
        <div className="flex flex-col grow justify-center items-center min-h-[430px]">
          <div className={
            circle
              ? "w-72 h-72 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mb-6 shadow"
              : "w-80 h-60 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow border-2 border-dashed border-gray-300"
          }>
            <img src={image.url} alt="preview" className="object-cover w-full h-full" />
          </div>
          <div className="font-bold text-xl mb-2">확인됐습니다!</div>
          <div className="text-gray-500 text-center text-sm mb-2 px-2">
            {circle
              ? <>식사 맛있게 하세요! 완식 확인 잊지마세요!<br />바로 분석한다면, ‘다음’ 버튼을 눌러주세요.</>
              : <>접시 상태가 업로드됐어요.<br />바로 분석하려면 '다음' 버튼을 눌러주세요.</>
            }
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-2 w-full px-6 pt-4 pb-6">
          <button
            className="flex-1 h-12 rounded-full bg-white border text-gray-700 font-bold shadow"
            onClick={onHome}
            type="button"
          >
            홈으로
          </button>
          <button
            className="flex-1 h-12 rounded-full bg-green-700 text-white font-bold shadow"
            onClick={() => onNext && onNext(image)}
            type="button"
          >
            다음
          </button>
        </div>
      </div>
    );
  }

  // 업로드(대기) 상태 화면 (중앙 정렬)
  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* 상단 바 */}
      <div className="w-full flex items-center px-6 pt-4 mb-2">
        <button className="w-9 h-9 flex items-center justify-center" onClick={onPrev}>
          <img src={BackBtn} alt="뒤로" className="w-7 h-7" />
        </button>
        <span className="flex-1 text-center text-gray-700 font-bold text-lg">식사 인증</span>
        <span className="w-9" />
      </div>
      {/* 진행바 + 안내 + 업로드아이콘 "가운데 정렬" */}
      <div className="flex flex-col grow items-center justify-center min-h-[430px]">
        <StepProgress current={step} total={totalStep} />
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-500 text-sm mb-5 whitespace-pre-line">{guide}</div>
        {/* 업로드 아이콘(중앙) */}
        <button
          className={
            circle
              ? "w-72 h-72 flex items-center justify-center cursor-pointer bg-transparent mb-4"
              : "w-80 h-60 flex items-center justify-center cursor-pointer bg-[#F7F7F7] rounded-xl border-2 border-dashed border-gray-300 mb-4"
          }
          onClick={handleUploadClick}
          type="button"
        >
          <img src={UploadIcon} alt="업로드" className={circle ? "w-full h-full object-contain" : "w-20 h-20 object-contain opacity-60"} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
      {/* 하단 버튼 */}
      <div className="flex gap-2 w-full px-6 pt-4 pb-6">
        <button
          className="flex-1 h-12 rounded-full bg-white border text-gray-700 font-bold shadow"
          onClick={onPrev}
          type="button"
        >
          뒤로가기
        </button>
        <button
          className="flex-1 h-12 rounded-full bg-gray-300 text-gray-500 font-bold shadow"
          disabled
          type="button"
        >
          다음
        </button>
      </div>
    </div>
  );
}
