import React, { useState, useEffect, useCallback } from "react";
import DragModal from "../components/DragModal";
import KakaoMap from "../components/KakaoMap";
import Search from "../assets/icons/Search.svg";
import Notification from "../assets/icons/Notification.svg";
import Current from "../assets/icons/Current.svg";
import { useUserStore } from "../stores/userStore";
import { useSelectedLocationStore } from "../stores/selectedLocationStore";
import { useGeoLocation } from "../hooks/useGeoLocation";
import Carousel from "../components/CarouselCard";
import SpinnerIndicator from "../components/SpinnerIndicator";
import DropdownButton from "../components/DropDownButton";
import dummyStores from "../data/dummyStores";
import StampProgressBar from "../components/StampProgressBar";
import Xbutton from "../assets/icons/Xbutton.svg";
import RightArrow from "../assets/icons/RightArrow.svg";
import { getCategoryParts } from "../utils/getCategoryParts";
import { getDistance } from "../utils/getDistance";
import SelectedLocationCard from "../components/SelectedLocationCard";
import Back3DIcon from "../assets/icons/Back_3D_btn.svg";
import PointButton from "../components/PointButton";
import StampCard from "../components/StampCard";
import { useNavStore } from "../stores/navStore";
import { usePlacesStore } from "../stores/placeStore";
import NotificationPopup from "../components/Popup/NotificationPopup";

//맛집리스트 오브젝트를 받기 위한 콘솔로그용
//import Test from "../components/test";

//gps 옵션
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const Main = () => {
  const places = usePlacesStore((state) => state.places);
  const showNav = useNavStore((state) => state.showNav);
  const { location, error } = useGeoLocation(geolocationOptions);
  const point = useUserStore((state) => state.point);
  const [notificationPopupVisible, setNotificationPopupVisible] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  //검색 필터 장소
  const [searchFilteredPlaces, setSearchFilteredPlaces] = useState([]);
  const [searching, setSearching] = useState(false);
  //나의 도장 현황 state
  const [selectedStoreIdx, setSelectedStoreIdx] = useState(null);
  // 식당 검색 도장 현황 state
  const [selectedSearchStoreIdx, setSelectedSearchStoreIdx] = useState(null);

  //현재 위치 찾기를 위해
  const [currentLocation, setCurrentLocation] = useState(location);

  const [initialHeight, setInitialHeight] = useState(370);

  const selectedLocation = useSelectedLocationStore(
    (state) => state.selectedLocation
  );
  const setSelectedLocation = useSelectedLocationStore(
    (state) => state.setSelectedLocation
  );

  const handleSelectIdx = useCallback((idx) => {
    setSelectedStoreIdx(idx);
  }, []);

  //초기 설정
  useEffect(() => {
    setSelectedLocation(null);
    showNav();
  }, []);

  //맨 처음 위치
  useEffect(() => {
    if (!location) return;
    setCurrentLocation(location);
  }, [location]);

  //현재 위치 기준 반경 10km 안에 있는 것들만
  useEffect(() => {
    if (!currentLocation) return;
    const nearby = places
      .map((place) => {
        const dist = getDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          Number(place.y),
          Number(place.x)
        );
        return {
          ...place,
          dist, // 거리(km) 추가
        };
      })
      .filter((place) => place.dist <= 10); // 키워드 조건 제거
    setFilteredPlaces(nearby);
  }, [currentLocation, places]);

  useEffect(() => {
    if (selectedLocation && selectedLocation.id) {
      console.log(selectedLocation.id);
      const foundIdx = dummyStores.findIndex(
        (store) => store.id === selectedLocation.id
      );
      if (foundIdx !== -1) {
        setSelectedSearchStoreIdx(foundIdx);
      } else {
        setSelectedSearchStoreIdx(null);
      }
    } else {
      setSelectedSearchStoreIdx(null);
    }
  }, [selectedLocation]);

  const currentGPS = () => {
    setInitialHeight(370);
    setSearching(false);
    setSelectedLocation(null);
    //강제로 재런더링
    setCurrentLocation({
      latitude: currentLocation.latitude - 0.00000001,
      longitude: currentLocation.longitude,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCurrentLocation({ latitude, longitude });
          console.log("새 GPS 위치 가져오기 성공", latitude, longitude);
        },
        (err) => {
          console.error("GPS 에러", err);
          alert("GPS 위치를 가져오는 데 실패했어요.");
        },
        geolocationOptions
      );
    } else {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    // 검색 로직
    if (!currentLocation) return;

    // 키워드가 비어있으면 검색 결과도 비우기
    if (newKeyword.trim() === "") {
      setSearchFilteredPlaces([]);
      return;
    }

    const nearby = places
      .map((place) => {
        const dist = getDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          Number(place.y),
          Number(place.x)
        );
        return { ...place, dist };
      })
      .filter((place) => {
        const matchesKeyword =
          place.placeName.includes(newKeyword) ||
          place.roadAddressName.includes(newKeyword);
        return place.dist <= 10 && matchesKeyword;
      });
    console.log(nearby);
    setSearchFilteredPlaces(nearby);
  };

  const clickItem = (item, categoryParts) => {
    console.log(item);
    setSearching(false);
    setInitialHeight(500);
    const selected = {
      id: item.restaurantId,
      lat: Number(item.y),
      lng: Number(item.x),
      image: item.imageUrl,
      category: categoryParts,
      title: item.placeName,
      subtitle: item.subtitle,
      image_url: item.imageUrl,
    };
    console.log(selected);
    setSelectedLocation(selected);
    console.log("🔍 클릭한 장소:", selected);
  };

  return (
    <div className="  h-screen w-full flex flex-col">
      <div className="absolute w-28 top-15 left-4 z-2">
        <PointButton point={point} />
      </div>
      <button
        className="absolute w-10 top-15 right-18 z-2 bg-white rounded-4xl h-9 flex flex-row justify-center items-center shadow-md"
        onClick={() => currentGPS()}
      >
        <img src={Current} alt="Search" className="w-5 h-5" />
      </button>
      <button
        className="absolute w-10 top-15 right-4 z-2 bg-white rounded-4xl h-9 flex flex-row justify-center items-center shadow-md"
        onClick={() => setNotificationPopupVisible(true)}
      >
        <img src={Notification} alt="Search" className="w-5 h-5" />
      </button>

      {/* <span className=" absolute right-0 top-2 w-50 z-2 font-bold text-red-600">
        {error ? (
          error.includes("User denied") || error.includes("Permission") ? (
            <p>위치 권한을 허용해 주세요!</p>
          ) : (
            <p>오류: {error}</p>
          )
        ) : currentLocation ? (
          <p>
            {currentLocation.latitude}, {currentLocation.longitude}
          </p>
        ) : null}
      </span> */}

      <div id="map" className="flex-1">
        <KakaoMap
          lat={currentLocation ? currentLocation.latitude : undefined}
          lng={currentLocation ? currentLocation.longitude : undefined}
        />
      </div>
      <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
        <div className="w-80 flex flex-col gap-2">
          {/* <div className="text-lg text-black font-extrabold">
            {name}님, 반가워요!
          </div> */}
          <div
            className="w-full bg-white rounded-2xl h-9 px-4 gap-1 flex flex-row justify-between items-center shadow-md"
            onBlur={() => {
              setInitialHeight(370);
              if (keyword.trim() === "") {
                setSearching(false);
              }
            }}
          >
            <input
              type="text"
              className="w-63 h-[70%]
               text-sm
               focus:outline-none 
               focus:placeholder-transparent
          
               "
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="식당을 검색해주세요"
              onFocus={() => {
                setInitialHeight(600);
                setSearching(true); // 검색 모드 활성화
                setSelectedLocation(null);
              }}
            />
            {keyword ? (
              <img
                src={Xbutton}
                alt="Xbutton"
                className="w-4 h-auto"
                onClick={() => {
                  setKeyword("");
                  setSearchFilteredPlaces([]);
                  setSearching(false);
                  setInitialHeight(370);
                  setSelectedLocation(null);
                }}
              />
            ) : null}
            <img src={Search} alt="Search" className="w-5 h-auto" />
          </div>
        </div>
        <DragModal
          minHeight={130}
          maxHeight={600}
          height={initialHeight}
          setHeight={setInitialHeight}
          backgroundColor="#f7f7f7"
        >
          {selectedLocation ? (
            <>
              <div className="mt-6">
                <img
                  src={Back3DIcon}
                  alt="Back3DIcon"
                  className="w-8 h-8"
                  onClick={() => {
                    setSelectedLocation(null);
                    if (keyword.trim() !== "") {
                      setSearching(true);
                      setInitialHeight(600);
                    } else {
                      setInitialHeight(370);
                    }
                  }}
                />
              </div>
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
              {selectedSearchStoreIdx !== null ? (
                <>
                  <StampCard selectedStoreIdx={selectedSearchStoreIdx} />
                  <div className="mt-3 w-full h-30" />
                </>
              ) : null}
            </>
          ) : (
            <>
              {searching ? (
                <>
                  <div className="font-bold text-xl mt-6">검색 결과</div>
                  {searchFilteredPlaces.length > 0 ? (
                    <div className="flex flex-col gap-3 mt-3 w-full mb-30">
                      {searchFilteredPlaces.map((place, idx) => {
                        const categoryParts = getCategoryParts(
                          place.clpCategory.category_name
                        );
                        return (
                          <div
                            key={place.id || idx}
                            className="flex flex-row h-25 items-center bg-white rounded-2xl shadow-md p-3"
                            onClick={() => clickItem(place, categoryParts)}
                          >
                            {/* 이미지 부분 */}
                            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                              {place.imageUrl ? (
                                <img
                                  src={place.imageUrl}
                                  alt={place.placeName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex justify-center items-center text-gray-400 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div className="h-full w-full flex flex-col gap-1 ml-3 overflow-hidden">
                              <div className="w-full h-auto flex flex-row justify-start items-center gap-2">
                                {categoryParts.map((part, idx) => (
                                  <div
                                    key={idx}
                                    className="w-auto p-1 justify-center items-center flex h-5 mainColor rounded-2xl"
                                  >
                                    <div className="text-[10px] text-white font-semibold">
                                      {part}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="font-bold text-base">
                                {place.placeName}
                              </div>
                            </div>
                            <img
                              src={RightArrow}
                              alt="RightArrow"
                              className="w-5 h-5"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="w-full text-center font-medium textGrayColor mt-6">
                      {keyword}에 대한 검색 결과가 없어요!
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className=" font-extrabold text-xl mt-6">
                    완식률 100%! 내 근처 맛집
                  </div>
                  <div className="h-50 mt-2 flex flex-row justify-center items-center ">
                    {error ? (
                      error.includes("User denied") ||
                      error.includes("Permission") ? (
                        <p>위치 권한을 허용해 주세요!</p>
                      ) : (
                        <p>오류: {error}</p>
                      )
                    ) : !currentLocation ? (
                      <SpinnerIndicator width={12} height={12} /> // 로딩 중 표시
                    ) : filteredPlaces.length > 0 ? (
                      <Carousel
                        items={filteredPlaces}
                        setHeight={setInitialHeight}
                      />
                    ) : (
                      <span className="font-bold textGrayColor">
                        주변에 CLP 매장이 없어요!
                      </span>
                    )}
                  </div>
                  <div className=" font-extrabold text-xl mt-4">도장 현황</div>
                  <div className=" mt-2 w-full h-auto">
                    <DropdownButton
                      items={dummyStores}
                      onSelectIdx={handleSelectIdx}
                      selectedStoreIdx={selectedStoreIdx}
                    />
                  </div>
                  {selectedStoreIdx !== null && (
                    <StampProgressBar selectedStoreIdx={selectedStoreIdx} />
                  )}
                </>
              )}
            </>
          )}
        </DragModal>
      </div>
      {notificationPopupVisible && (
        <NotificationPopup onClose={() => setNotificationPopupVisible(false)} />
      )}
    </div>
  );
};

export default Main;
