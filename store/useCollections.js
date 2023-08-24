import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCollections = create(
  persist(
    (set, get) => ({
      collections: [],
      setCollections: (collections) => set({ collections }),
    }),
    {
      name: "user-collections", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
