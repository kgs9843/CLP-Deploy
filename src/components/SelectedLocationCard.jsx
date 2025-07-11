import React from "react";

const SelectedLocationCard = ({ selectedLocation }) => {
  return (
    <div className="h-auto flex flex-row w-full justify-between gap-4 items-start mt-6">
      {selectedLocation.image_url ? (
        <img
          src={selectedLocation.image_url}
          alt={selectedLocation.title}
          className="w-30 h-30 object-cover rounded-2xl"
        />
      ) : (
        <div className="w-30 h-30 flex justify-center items-center rounded-2xl text-gray-400 text-xs bg-amber-100">
          No Image
        </div>
      )}
      <div className="flex flex-col h-full flex-1 justify-start gap-2 ">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          {selectedLocation.category.map((part, idx) => (
            <div
              key={idx}
              className="w-auto p-1 justify-center items-center flex h-5 mainColor rounded-2xl"
            >
              <div className="text-[10px] text-white font-semibold">{part}</div>
            </div>
          ))}
        </div>
        <div className="font-bold text-2xl">{selectedLocation.title}</div>
        <div className="textGraySubColor text-sm">
          {selectedLocation.subtitle}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SelectedLocationCard);
