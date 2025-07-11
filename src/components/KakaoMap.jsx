import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useSelectedLocationStore } from "../stores/selectedLocationStore";
import markerSvg from "../assets/marker.svg";

const KakaoMap = ({ lat = 37.4024068885376, lng = 127.101100614 }) => {
  const [state, setState] = useState({
    center: { lat, lng },
    isPanto: true,
  });

  const selectedLocation = useSelectedLocationStore(
    (state) => state.selectedLocation
  );
  useEffect(() => {
    if (lat && lng) {
      setState((prev) => ({
        ...prev,
        center: { lat, lng },
      }));
    }
  }, [lat, lng]);
  useEffect(() => {
    if (selectedLocation) {
      setState((prev) => ({
        ...prev,
        center: {
          lat: selectedLocation.lat - 0.01,
          lng: selectedLocation.lng,
        },
      }));
    } else if (lat && lng) {
      setState((prev) => ({
        ...prev,
        center: { lat, lng },
      }));
    }
  }, [selectedLocation, lat, lng]);

  return (
    <Map
      center={state.center}
      isPanto={state.isPanto}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
      level={5}
    >
      {selectedLocation && (
        <MapMarker
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          image={{
            src: markerSvg, // public 폴더 기준 경로
            size: { width: 40, height: 40 },
            options: { offset: { x: 20, y: 40 } },
          }}
        />
      )}
    </Map>
  );
};
export default React.memo(KakaoMap);
