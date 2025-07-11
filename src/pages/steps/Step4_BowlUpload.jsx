export default function Step4_BowlUpload({ onNext, onPrev }) {
  return (
    <div className="p-6 flex flex-col h-[630px]">
      <button className="mb-2 text-gray-500" onClick={onPrev}>&larr; 뒤로</button>
      <div className="grow flex flex-col justify-center items-center">
        <div className="font-bold text-lg mb-2">잔반 상태를 업로드해주세요.</div>
        <div className="w-40 h-40 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl mb-4">
          <span className="text-gray-400 text-5xl mb-2">&#8682;</span>
          <div className="text-gray-500 text-sm">이미지 업로드</div>
        </div>
      </div>
      <div className="flex gap-2 mt-auto">
        <button className="w-1/2 h-12 rounded-lg bg-gray-300 text-gray-800 font-bold" onClick={onPrev}>취소</button>
        <button className="w-1/2 h-12 rounded-lg bg-green-700 text-white font-bold" onClick={() => onNext("bowl.jpg")}>분석 시작</button>
      </div>
    </div>
  );
}
