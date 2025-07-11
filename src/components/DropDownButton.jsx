import React, { useState } from "react";
import UpArrow from "../assets/icons/UpArrow.svg";
import DownArrow from "../assets/icons/DownArrow.svg";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const DropdownButton = ({ items, onSelectIdx, selectedStoreIdx }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-md w-full rounded-4xl justify-between px-4 py-2 flex flex-row items-center"
      >
        <span className="text-black font-semibold">
          {items[selectedStoreIdx]?.name || "가게 선택"}
        </span>
        <img
          src={isOpen ? UpArrow : DownArrow}
          alt="Arrow"
          className="w-5 h-5"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-1 bg-white rounded-2xl shadow-lg z-10 max-h-30 overflow-auto"
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onSelectIdx(idx);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(DropdownButton);
