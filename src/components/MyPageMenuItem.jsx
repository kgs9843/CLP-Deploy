import React from "react";
import RightArrowIcon from "../assets/icons/RightArrow.svg";

const MyPageMenuItem = ({ icon = null, title, subtitle, onClick, height }) => {
  return (
    <div
      className={`flex items-center justify-between ${
        height ? `h-[${height}]` : `h-20`
      } bg-white rounded-2xl p-4 gap-4`}
      onClick={onClick}
    >
      <div className=" flex flex-row justify-center gap-4">
        {icon && (
          <div className="subColorGreen w-10 h-10 flex justify-center items-center">
            <img src={icon} alt="" className="w-6 h-6 " />
          </div>
        )}
        <div className="flex flex-col justify-center">
          <div className="text-xl font-bold">{title}</div>
          {subtitle && (
            <div className="text-xs textGraySubColor">{subtitle}</div>
          )}
        </div>
      </div>
      {icon && <img src={RightArrowIcon} alt=">" />}
    </div>
  );
};

export default MyPageMenuItem;
