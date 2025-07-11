// src/components/BottomNav.jsx
import { useNavStore } from "../stores/navStore";

import House from "../assets/icons/Nav_icon/House_L.svg";
import HouseActive from "../assets/icons/Nav_icon/House.svg";
import Notepad from "../assets/icons/Nav_icon/Notepad_L.svg";
import NotepadActive from "../assets/icons/Nav_icon/Notepad.svg";
import QR from "../assets/icons/Nav_icon/QR.svg";
import QRIng from "../assets/icons/Nav_icon/ing.svg";
import Point from "../assets/icons/Nav_icon/Point_L.svg";
import PointActive from "../assets/icons/Nav_icon/Point.svg";
import UserCircle from "../assets/icons/Nav_icon/UserCircle_L.svg";
import UserCircleActive from "../assets/icons/Nav_icon/UserCircle.svg";

const navItems = [
  { label: "홈", icon: House, activeIcon: HouseActive },
  { label: "기록", icon: Notepad, activeIcon: NotepadActive },
  {
    label: "식사 인증",
    icon: QR,
    ingIcon: QRIng,
    isCenter: true,
  },
  { label: "포인트", icon: Point, activeIcon: PointActive },
  { label: "마이페이지", icon: UserCircle, activeIcon: UserCircleActive },
];

export default function BottomNav() {
  // navVisible 추가! 👇
  const { selectedIdx, setSelectedIdx, certInProgress, navVisible } =
    useNavStore();

  // 네비바 숨김(로그인 등)일 때 렌더링 X 👇
  if (!navVisible) return null;

  return (
    <nav
      className="
        fixed bottom-0 left-1/2 z-50
        flex items-end justify-between
        bg-white
        min-w-[300px] max-w-[500px] w-full
        rounded-t-[30px]
        px-0
        overflow-visible
        -translate-x-1/2
      "
      style={{
        boxShadow: "none",
        borderRadius: "30px 30px 0 0",
      }}
    >
      {navItems.map((item, idx) => {
        // 중앙(인증) 버튼
        if (item.isCenter) {
          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center justify-end z-10"
              style={{
                marginTop: "-31px",
                minWidth: 0,
              }}
            >
              <button
                className="flex flex-col items-center outline-none border-none bg-transparent"
                style={{ padding: 0, margin: 0 }}
                onClick={() => setSelectedIdx(idx)}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 62,
                    height: 62,
                    background: "#003D28",
                    borderRadius: "50%",
                    boxShadow: "0 6px 20px 0 rgba(0, 61, 40, 0.22)",
                  }}
                >
                  <img
                    src={certInProgress ? item.ingIcon : item.icon}
                    alt={item.label}
                    style={{
                      width: 32,
                      height: 32,
                      userSelect: "none",
                    }}
                  />
                </div>
                <span
                  className="text-[13px] font-bold"
                  style={{
                    color: selectedIdx === idx ? "#003D28" : "#888",
                    paddingBottom: "24px",
                    marginTop: "13px",
                  }}
                >
                  {item.label}
                </span>
              </button>
            </div>
          );
        }

        // 첫번째(왼쪽 끝)과 마지막(오른쪽 끝)만 padding 적용
        const isFirst = idx === 0;
        const isLast = idx === navItems.length - 1;
        const isActive = selectedIdx === idx;
        return (
          <button
            key={item.label}
            className="flex-1 flex flex-col items-center justify-end h-full outline-none active:opacity-90"
            style={{
              minWidth: 0,
              margin: 0,
              padding: 0,
              border: "none",
              background: "none",
              paddingLeft: isFirst ? 30 : 0,
              paddingRight: isLast ? 30 : 0,
            }}
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={isActive ? item.activeIcon : item.icon}
              alt={item.label}
              style={{
                width: 24,
                height: 24,
                marginTop: 13,
                marginBottom: 0,
                userSelect: "none",
              }}
            />
            <span
              className={`text-[13px] transition-colors duration-150 ${
                isActive
                  ? "text-[#003D28] font-bold"
                  : "text-gray-400 font-normal"
              }`}
              style={{
                letterSpacing: "-0.02em",
                paddingBottom: "24px",
                marginTop: "13px",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
