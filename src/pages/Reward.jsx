import React, { useState, useEffect } from "react";
import DragModal from "../components/DragModal";
import MonthSelector from "../components/MonthSelector";
import dummyReward from "../data/dummyReward";
import RewardHistoryList from "../components/RewardHistoryList";
import RewardExchangeSection from "../components/RewardExchangeSection";
import { useUserStore } from "../stores/userStore";
import DonatePopup from "../components/Popup/DonatePopup";
import GiftPopup from "../components/Popup/GiftPopup";
import { fetchPoint } from "../api/fetchPoint";

const Reward = () => {
  const globalSetPoint = useUserStore((state) => state.setPoint);
  const [point, setPoint] = useState(0);
  const donateLogs = [
    { name: "야호", point: 20 },
    { name: "예영", point: 20 },
    { name: "야싸", point: 20 },
  ];

  const [onClickDonateBtn, setOnClickDonateBtn] = useState(false);
  const [onClickGiftBtn, setOnClickGiftBtn] = useState(false);

  const [initialHeight, setInitialHeight] = useState(470);
  const [activeTab, setActiveTab] = useState("조회");
  const [activeMenu, setActiveMenu] = useState("전체");

  // 이번 달 적립 된 금액
  const [earnedPoint, setEarnedPoint] = useState(0);

  // 이번 달 차감 된 금액
  const [deductedPoint, setDeductedPoint] = useState(0);

  const [session] = useState("하반기");

  const menus = ["전체", "적립", "차감"];

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchPoint();
        console.log(result);
        globalSetPoint(result);
        setPoint(result);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    })();
  }, [point, globalSetPoint]);

  // 날짜 상태
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 최소 허용 월 (예: 2024년 1월)
  const minYear = 2024;
  const minMonth = 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <>
      <div className="h-screen w-full flex flex-col relative">
        <div className="flex-1 px-4 subColor ">
          <div className="w-full h-10 mt-15 font-bold text-2xl text-end">
            포인트
          </div>
          <div className="relative w-full h-8 flex gap-4 flex-row justify-center items-center mt-5">
            <div
              className={`cursor-pointer font-medium  ${
                activeTab === "조회" ? " textMainColor" : "textGraySubColor"
              }`}
              onClick={() => setActiveTab("조회")}
            >
              조회
            </div>
            <div
              className={`cursor-pointer font-medium ${
                activeTab === "교환" ? "textMainColor" : "textGraySubColor"
              }`}
              onClick={() => setActiveTab("교환")}
            >
              교환
            </div>

            <div
              className={`absolute bottom-0 h-0.5 mainColor transition-all duration-300`}
              style={{
                width: "40px", // 밑줄 길이
                left:
                  activeTab === "조회" ? "calc(50% - 41px)" : "calc(50% + 3px)",
              }}
            />
          </div>
          <div className="w-full h-auto mt-5 textGraySubColor text-md text-center">
            보유 CLP 포인트
          </div>
          <div className="w-full h-auto mt-5 flex flex-row justify-center">
            <div className="w-auto h-auto textMainColor font-bold text-6xl text-center">
              {point}
            </div>
            <div className="w-auto h-auto ml-2 textMainColor text-6xl text-center">
              P
            </div>
          </div>
          <div className="w-full h-10 rounded-3xl px-5 bg-white mt-6 flex flex-row justify-between items-center">
            <div className="w-auto h-auto flex flex-row justify-center items-center gap-2">
              <div className="w-auto h-auto textGraySubColor text-sm">
                {session} 소멸 예정 CLP 포인트
              </div>
              <div className="w-3 h-3 text-[10px] rounded-full mainGrayColor text-white flex justify-center items-center">
                ?
              </div>
            </div>
            <div className="w-auto h-auto flex flex-row justify-center">
              <div className="w-auto h-auto font-bold text-center">{point}</div>
              <div className="w-auto h-auto ml-2  text-center">P</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center items-center gap-3">
          <DragModal
            minHeight={470}
            maxHeight={700}
            height={initialHeight}
            setHeight={setInitialHeight}
            backgroundColor="#ffffff"
          >
            {activeTab === "조회" ? (
              <>
                <div className=" w-full mt-6 flex flex-row justify-between items-center">
                  {/* 월 이동 영역 */}
                  <MonthSelector
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    setSelectedYear={setSelectedYear}
                    setSelectedMonth={setSelectedMonth}
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    minYear={minYear}
                    minMonth={minMonth}
                  />
                  <div className="w-auto h-full flex flex-row justify-center items-center gap-2">
                    {menus.map((tab) => (
                      <div
                        key={tab}
                        className={`w-auto p-2 justify-center items-center flex h-5 rounded-2xl cursor-pointer
            ${activeMenu === tab ? "mainColor" : "mainGrayColor"}`}
                        onClick={() => setActiveMenu(tab)}
                      >
                        <div className="text-[10px] text-white font-semibold">
                          {tab}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="justify-between mt-5 flex flex-row w-full gap-3 mb-5">
                  <div className=" h-8 flex-1/2 subColor rounded-3xl flex px-4 items-center flex-row justify-between">
                    <div className="text-sm font-bold textGraySubColor">
                      적립
                    </div>
                    <div className="flex flex-row gap-1">
                      <div className="text-sm font-extrabold">
                        + {earnedPoint}
                      </div>
                      <div className="text-sm ">P</div>
                    </div>
                  </div>
                  <div className=" h-8 flex-1/2 subColor rounded-3xl flex px-4 items-center flex-row justify-between">
                    <div className="text-sm font-bold textGraySubColor">
                      차감
                    </div>
                    <div className="flex flex-row gap-1">
                      <div className="text-sm font-extrabold">
                        - {deductedPoint}
                      </div>
                      <div className="text-sm ">P</div>
                    </div>
                  </div>
                </div>

                <RewardHistoryList
                  data={dummyReward}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  setEarnedPoint={setEarnedPoint}
                  setDeductedPoint={setDeductedPoint}
                  activeMenu={activeMenu}
                />

                <div className="h-20"></div>
              </>
            ) : (
              <RewardExchangeSection
                donateLogs={donateLogs}
                setOnClickDonateBtn={setOnClickDonateBtn}
                setOnClickGiftBtn={setOnClickGiftBtn}
              />
            )}
          </DragModal>
        </div>
      </div>
      {/* 기부 팝업 */}
      {onClickDonateBtn && (
        <DonatePopup
          onClose={() => setOnClickDonateBtn(false)}
          point={point}
          donateLogs={donateLogs}
          setPoint={setPoint}
        />
      )}

      {/* 굿즈 팝업 */}
      {onClickGiftBtn && (
        <GiftPopup
          onClose={() => setOnClickGiftBtn(false)}
          point={point}
          setPoint={setPoint}
        />
      )}
    </>
  );
};

export default Reward;
