import React, { useState, useEffect } from "react";
import DragModal from "../DragModal";
import { useNavStore } from "../../stores/navStore";

const InquiryPopup = ({ onClose }) => {
  const [initialHeight, setInitialHeight] = useState(450);
  const [feedback, setFeedback] = useState(""); // textarea 값 관리

  // 네비바 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);

  useEffect(() => {
    hideNav();
    return showNav;
  }, []);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      console.log("내용을 입력해주세요!");
      return;
    }
    console.log("전송된 의견:", feedback);
    // 이후 실제 전송 로직 추가 가능
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="absolute w-full inset-0 h-full bg-black/40 gap-2 flex flex-col items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3"
      >
        <DragModal
          minHeight={450}
          maxHeight={450}
          height={initialHeight}
          setHeight={setInitialHeight}
          backgroundColor="#ffffff"
        >
          <div className="font-extrabold text-xl mt-12 text-start">
            CLP를 쓰면서 <br />
            경험은 어떠셨나요?
          </div>
          <div className="text-sm textGraySubColor mt-4 text-start">
            남겨주신 의견은 서비스 개선에 소중히 활용하겠습니다.
          </div>
          <textarea
            className="w-full mt-4 p-2 border border-gray-300 textGraySubColor text-sm rounded focus:outline-none resize-none"
            rows={5}
            placeholder="한마디를 해주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            className={`w-full mt-10 rounded-full py-2 mb-4 text-white ${
              feedback.trim() ? "mainColor" : "bg-gray-300"
            }`}
            onClick={handleSubmit}
          >
            의견 남기기
          </button>
        </DragModal>
      </div>
    </div>
  );
};

export default InquiryPopup;
