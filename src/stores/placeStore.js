import { create } from "zustand";
import dummyPlaces from "../data/dummyPlaces";

export const usePlacesStore = create((set) => ({
  places: dummyPlaces, // 초기값으로 dummyPlaces 설정
  setPlaces: (newPlaces) => set({ places: newPlaces }),
}));
