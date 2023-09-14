import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  deleteCollectionApi,
  fetchCollectionsApi,
} from "../services/client.service";

export const useCollections = create(
  persist(
    (set, get) => ({
      collections: [],
      fetchCollections: async () => {
        const { data } = await fetchCollectionsApi();
        set({ collections: data?.collections || [] });
      },
      deleteCollection: async (collectionId) => {
        try {
          const { data } = await deleteCollectionApi({ collectionId });
          set({ collections: data?.collections || [] });
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    {
      name: "user-collections", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
