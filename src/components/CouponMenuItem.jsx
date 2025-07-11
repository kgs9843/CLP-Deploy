import React from "react";

const CouponMenuItem = ({
  imageUrl = null,
  title,
  date,
  onClick,
  isAvailable = true,
}) => {
  return (
    <div
      className={`flex items-center justify-between h-20 bg-white rounded-2xl p-4 gap-4 cursor-pointer
        ${!isAvailable ? "opacity-50" : ""}`}
      onClick={isAvailable ? onClick : null}
    >
      <div className="flex flex-row justify-center gap-4">
        <div className="bg-amber-200 w-15 h-15 rounded-xl flex justify-center items-center">
          {imageUrl ? (
            <img src={imageUrl} alt="쿠폰 이미지" className="w-6 h-6" />
          ) : (
            <div className="text-xs text-white">No Img</div>
          )}
        </div>

        <div className="flex flex-col justify-center items-start gap-1">
          <div className="w-auto px-1 flex justify-center items-center h-5 mainColor rounded-2xl">
            {isAvailable ? (
              <div className="text-[10px] text-white font-semibold">{date}</div>
            ) : (
              <div className="text-[10px] text-white font-semibold">
                사용 완료
              </div>
            )}
          </div>

          <div className="text-lg font-bold">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CouponMenuItem;
