import { create } from "zustand";

export const useUserStore = create((set) => ({
  id: 1,
  name: "다연",
  point: 30412,
  setName: (newName) => set({ name: newName }),
  setPoint: (newPoint) => set({ point: newPoint }),
  setId: (newId) => set({ id: newId }),
}));
