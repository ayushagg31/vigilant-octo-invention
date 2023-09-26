import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  deleteCollectionApi,
  fetchCollectionsApi,
  updateChatLimit,
} from "../services/client.service";
import { FREE_TIER } from "../config/plan.config";

export const useCollections = create(
  persist(
    (set, get) => ({
      isLoading: true,
      collections: [],
      currentPlan: FREE_TIER,
      queryInfo: {
        count: 0,
      },
      fetchCollections: async () => {
        const { data } = await fetchCollectionsApi();
        set({
          collections: data?.collections || [],
          currentPlan: data?.currentPlan,
          queryInfo: data?.queryInfo || {},
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
      updateChatCount: async () => {
        try {
          await updateChatLimit();
        } catch (error) {}
      },
    }),
    {
      name: "user-collections", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
