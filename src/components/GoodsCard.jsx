import React from "react";
import { subtractPoint } from "../api/subtractPoint";
const GoodsCard = ({
  imageSrc,
  title,
  description,
  point,
  myPoint,
  setPoint,
}) => {
  const handleClick = async () => {
    try {
      console.log(point);
      await subtractPoint(point);
      setPoint(myPoint - point);
      console.log("포인트 차감 성공!");
    } catch (error) {
      console.error("포인트 차감 실패:", error);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-between bg-white rounded-xl p-2 w-full max-w-[160px]"
    >
      <div className="w-full h-auto rounded-md overflow-hidden flex justify-center items-center">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="text-md font-extrabold mt-3 text-start w-full">
        {title}
      </div>
      <div
        className="text-sm mt-1 textGraySubColor text-start w-full"
        style={{ whiteSpace: "pre-line" }}
      >
        {description}
      </div>
      <div className="w-full mt-2 text-xs font-bold flex flex-row justify-end items-end gap-1">
        <div className="text-[10px] relative mainColor rounded-4xl w-4 h-4 text-white flex justify-center items-center font-bold">
          P
        </div>
        <span className="textMainColor font-extrabold">
          {point.toLocaleString()} P
        </span>
      </div>
    </div>
  );
};

export default GoodsCard;
