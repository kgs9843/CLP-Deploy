import React from "react";
import WaringBlockSVG from "../../assets/icons/WarningBlock.svg";
import XblockSVG from "../../assets/icons/Xblock.svg";

const CouponClickPopup = ({ coupon, onClose, getDDay }) => {
  return (
    <div className="absolute w-full h-full inset-0 bg-black/40 gap-2 flex flex-col justify-center items-center z-50 p-4">
      <div className=" flex w-full justify-end">
        <img src={XblockSVG} alt="x블록" onClick={onClose} className="w-8" />
      </div>
      <div className="bg-white flex flex-col h-100 justify-center gap-1 items-center rounded-3xl w-full relative">
        {/* 상단 이미지 */}
        <div className="w-full top-0 absolute">
          <img
            src={coupon.imageUrl}
            alt={"매장 이미지"}
            className="bg-amber-950/60  rounded-t-3xl w-full h-70 object-cover"
          />
        </div>

        <div className=" flex flex-col w-full h-full justify-end gap-3 items-center z-10 px-6 ">
          <div className=" text-xs w-auto px-2 rounded-full bg-white">
            {coupon.isAvailable ? `${getDDay(coupon.deadline)}` : "사용완료"}
          </div>

          <div className="text-center font-bold text-2xl text-white">
            {coupon.title}
          </div>

          {/* 바코드 */}
          <div className="bg-white p-2 w-full h-40 rounded-xl border mt-2 mb-4">
            <img
              src={coupon.barcode}
              alt="barcode"
              className="w-48 h-12 object-contain"
            />
          </div>

          {/* 유효기간 */}
          <div className="flex justify-between  text-xs w-full px-2 mb-5">
            <span className="textGraySubColor">유효기간</span>
            <span>{coupon.deadline} 까지</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponClickPopup;
