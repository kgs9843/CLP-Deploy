import { create } from "zustand";

export const useSelectedLocationStore = create((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) =>
    set({
      selectedLocation: location
        ? {
            id: location.id,
            lat: location.lat,
            lng: location.lng,
            image: location.image ?? null,
            category: location.category,
            title: location.title,
            subtitle: location.subtitle,
            image_url: location.image_url,
          }
        : null,
    }),
}));
