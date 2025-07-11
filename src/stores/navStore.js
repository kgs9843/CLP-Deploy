// src/stores/navStore.js
import { create } from "zustand";

// 네비바 전역 상태 관리
export const useNavStore = create((set) => ({
  selectedIdx: 0,              
  certInProgress: false,    
  navVisible: true,           

  setSelectedIdx: (idx) => set({ selectedIdx: idx }),
  setCertInProgress: (flag) => set({ certInProgress: flag }),
  showNav: () => set({ navVisible: true }),
  hideNav: () => set({ navVisible: false }),
}));
