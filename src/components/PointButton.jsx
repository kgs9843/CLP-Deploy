import React from "react";

const PointButton = ({ point }) => {
  return (
    <button className="bg-white rounded-2xl h-9 px-4 flex flex-row justify-between items-center shadow-md">
      <div className="relative -left-2 mainColor rounded-4xl w-6 h-6 text-white flex justify-center items-center font-bold">
        P
      </div>
      <span className="text-xs font-bold">{point} p</span>
    </button>
  );
};

export default PointButton;
