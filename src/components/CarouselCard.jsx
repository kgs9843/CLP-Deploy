import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSelectedLocationStore } from "../stores/selectedLocationStore";
import { getCategoryParts } from "../utils/getCategoryParts";

const Carousel = ({ items, setHeight }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setSelectedLocation = useSelectedLocationStore(
    (state) => state.setSelectedLocation
  );

  const clickItem = (item, idx, categoryParts) => {
    setHeight(500);
    const selected = {
      id: item.id,
      lat: Number(item.y),
      lng: Number(item.x),
      image: item.image_url,
      category: categoryParts,
      title: item.place_name,
      subtitle: item.subtitle,
      image_url: item.img_url,
    };
    setSelectedLocation(selected);
    console.log("🔍 클릭한 장소:", selected);

    // 터치하면 그 카드로 이동하는 애니메이션
    // if (containerRef.current) {
    //   const container = containerRef.current;
    //   const containerWidth = container.offsetWidth;
    //   const itemWidth = container.firstChild.offsetWidth + 4; // gap 포함

    //   // 클릭한 아이템이 컨테이너 가운데로 오도록 스크롤 위치 계산
    //   const targetScrollLeft =
    //     itemWidth * idx - containerWidth / 2 + itemWidth / 2 + 80;

    //   container.scrollTo({
    //     left: targetScrollLeft,
    //     behavior: "smooth",
    //   });
    // }
  };

  // 스크롤 위치에 따라 activeIndex 계산
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const containerWidth = containerRef.current.offsetWidth;
    const itemWidth = containerRef.current.firstChild.offsetWidth + 4; // gap 포함

    const center = scrollLeft + containerWidth / 2 - 100;
    const newIndex = Math.round(center / itemWidth - 0.5); // -0.5: center 기준
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-row items-center overflow-x-auto gap-0 no-scrollbar px-20 pr-40"
    >
      {items.map((item, idx) => {
        const scale = idx === activeIndex ? 1.05 : 0.8;
        const categoryParts = getCategoryParts(item.category_name);
        return (
          <motion.div
            key={item.id}
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-amber-400 rounded-[20px] shadow-2xs text-xs w-40 h-40 flex-shrink-0"
            onClick={() => clickItem(item, idx, categoryParts)}
          >
            <div className=" h-full w-full p-3 flex flex-col justify-between items-center">
              <div className="text-[10px] w-full text-right font-semibold text-white">
                지금으로부터{" "}
                <span className="subTextColor">{item.dist.toFixed(1)}km</span>
              </div>

              <div className="w-full h-auto flex flex-col justify-start">
                <div className="w-full flex flex-row justify-start items-center gap-2">
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
                <div className="font-semibold text-lg text-white">
                  {item.place_name}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default React.memo(Carousel);
