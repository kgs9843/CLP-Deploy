import React from "react";
import WaringBlockSVG from "../../assets/icons/WarningBlock.svg";
import XblockSVG from "../../assets/icons/Xblock.svg";
import { subtractPoint } from "../../api/subtractPoint";

const DonateDecidePopup = ({ onClose, point, setPoint }) => {
  const handleClick = async () => {
    try {
      // point 값을 넘겨서 API 호출
      await subtractPoint(20);
      setPoint(point - 20);
      console.log("포인트 차감 성공!");
      // 필요하다면 사용자 알림이나 UI 업데이트 로직 추가
    } catch (error) {
      console.error("포인트 차감 실패:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 gap-2 flex flex-col justify-center items-center z-50 p-4">
      <div className=" flex w-full justify-end">
        <img src={XblockSVG} alt="x블록" onClick={onClose} className="w-8" />
      </div>
      <div className="bg-white flex flex-col justify-center gap-1 items-center rounded-3xl w-full max-w-md py-8 px-6 relative">
        <img src={WaringBlockSVG} alt="!블록" className="mb-2" />
        <div className="text-xl font-bold text-center">
          <span className="subTextColor">20 P 기부</span>하시겠습니까?
        </div>
        <p className="textGraySubColor2 text-xs text-center mb-4">
          기부를 선택하신 포인트는 환불되거나 되돌릴 수 없어요.
          <br /> 일정 단위(예: 20P 마다 200원) 실제 금액으로 환산해 전달돼요.
        </p>
        <div className="flex flex-row gap-3 w-full justify-between">
          <button
            className="mainGrayColor text-white rounded-full px-4 py-2 flex-1/2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="mainColor text-white rounded-full px-4 py-2  flex-1/2"
            onClick={handleClick}
          >
            기부
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateDecidePopup;
