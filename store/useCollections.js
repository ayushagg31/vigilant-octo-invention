import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  deleteCollectionApi,
  fetchCollectionsApi,
  updateUsageInfo,
} from "../services/client.service";
import { FREE_TIER } from "../constants/plan.constants";

export const useCollections = create(
  persist(
    (set, get) => ({
      isLoading: true,
      collections: [],
      currentPlan: FREE_TIER,
      usageInfo: {
        pdf: {
          count: 0,
        },
        mp3: {
          count: 0,
        },
        query: {
          count: 0,
        },
      },
      fetchCollections: async () => {
        const { data } = await fetchCollectionsApi();
        set({
          collections: data?.collections || [],
          currentPlan: data?.currentPlan,
          usageInfo: data?.usageInfo || {},
          isLoading: false,
        });
      },
      deleteCollection: async (collectionId) => {
        try {
          const { data } = await deleteCollectionApi({ collectionId });
          set({ collections: data?.collections || [] });
        } catch (error) {
          throw new Error(error);
        }
      },
      updateUsageInfo: async () => {
        try {
          await updateUsageInfo();
        } catch (error) {}
      },
    }),
    {
      name: "user-collections", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
