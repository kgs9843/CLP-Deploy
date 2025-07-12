import React, { useEffect } from "react";
import Back3DBtnIcon from "../../assets/icons/Back_3D_btn.svg";
import PointButton from "../PointButton";
import GoodsCard from "../GoodsCard";
import Cup from "../../assets/cup.png";
import TShirt from "../../assets/tshirt.png";
import Doll from "../../assets/doll.png";
import GoodsCardImg from "../../assets/goods_card.png";
import { useNavStore } from "../../stores/navStore";
const GiftPopup = ({ onClose, point, setPoint }) => {
  // 네비바 주스탠드로 상태 관리
  const hideNav = useNavStore((state) => state.hideNav);
  const showNav = useNavStore((state) => state.showNav);

  useEffect(() => {
    hideNav(); // 진입시 네비 숨김
    return showNav; // 언마운트(나갈 때) 복구
  }, []);
  const goodsItems = [
    {
      imageSrc: TShirt,
      title: "CLP 티셔츠",
      description: "귀여운 CLP 캐릭터가 \n중앙에 위치한 티셔츠",
      point: 2000,
    },
    {
      imageSrc: Doll,
      title: "CLP 키링",
      description: "지구방위대의 \n방어력이 어마무시!",
      point: 2000,
    },
    {
      imageSrc: Cup,
      title: "CLP 머그컵",
      description: "CLP 머그컵으로 \n물 마시면서 건강 찾자!",
      point: 2000,
    },
  ];

  return (
    <div className="absolute w-full h-full inset-0  subColor flex-1 px-4 flex flex-col z-50">
      <div className="w-full h-10 mt-15 font-bold text-2xl text-end flex flex-row justify-between">
        <img
          src={Back3DBtnIcon}
          alt="뒤로가기 버튼"
          className="w-8 h-8"
          onClick={onClose}
        />
        <div>CLP 굿즈 교환</div>
      </div>
      <div className="w-full h-10 mt-10 text-end flex flex-row justify-between">
        <div className=" text-2xl font-extrabold text-start">
          포인트로 교환하는
          <br />
          <span className="subTextColor">CLP 한정 굿즈</span>
        </div>
        <div>
          <PointButton point={point} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-12 ">
        {goodsItems.map((item, index) => (
          <GoodsCard
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            point={item.point}
            myPoint={point}
            setPoint={setPoint}
          />
        ))}
      </div>
    </div>
  );
};

export default GiftPopup;
