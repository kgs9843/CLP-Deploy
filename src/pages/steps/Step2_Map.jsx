import React, { useState } from "react";
import KakaoMap from "../../components/KakaoMap";
import SelectedLocationCard from "../../components/SelectedLocationCard";
import StampProgressBar from "../../components/StampProgressBar";
export default function Step2_Map({ qrResult, onNext, onPrev }) {
  const [currentLocation, setCurrentLocation] = useState(location);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "1755230985",
    lat: "126.7387495041629",
    lng: "37.389536949801084",
    image: null,
    category: ["음식점", "카페"],
    title: "스타벅스 시흥월곶점",
    subtitle: "언제나 편안한, 우리들의 스타벅스",
    image_url: null,
  });
  //추후에 백엔드랑 매장의 도장 개수 비교 인덱스
  const [selectedSearchStoreIdx, setSelectedSearchStoreIdx] = useState(null);
  return (
    <div className="  h-screen w-full flex flex-col">
      <button className="mb-2 text-gray-500" onClick={onPrev}>
        &larr; 뒤로
      </button>
      <div id="map" className="flex-1">
        <KakaoMap
          lat={currentLocation ? currentLocation.latitude : undefined}
          lng={currentLocation ? currentLocation.longitude : undefined}
        />
      </div>
      <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
        <div
          className="w-full rounded-t-2xl shadow-lg flex flex-col"
          style={{ height: `600px`, backgroundColor: "#f7f7f7" }}
        >
          <div className="overflow-auto flex-1 px-4">
            {selectedLocation ? (
              <>
                <div className="mt-6" />
                <SelectedLocationCard selectedLocation={selectedLocation} />
                <div className="mt-3 w-full textGrayColor text-sm">도장</div>
                {selectedSearchStoreIdx !== null ? (
                  <StampProgressBar selectedStoreIdx={selectedSearchStoreIdx} />
                ) : (
                  <div className="mt-3 w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-1 h-30 justify-center">
                    <div className="w-full textGrayColor text-center text-sm">
                      매장을 방문한 적이 없어요!
                    </div>
                  </div>
                )}
              </>
            ) : null}

            <button
              className="w-full h-12 rounded-lg mt-auto bg-green-700 text-white font-bold"
              onClick={() => onNext({ name: qrResult, review: "" })}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
