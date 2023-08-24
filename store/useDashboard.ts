import { create } from "zustand";
import axios from "axios";
import { tabItems } from "../constants/dashboard.constants";
import { DashboardStoreTypes } from "./types/Dashboard.types";

export const useDashboard = create<DashboardStoreTypes>((set) => ({
  currentTab: tabItems[0].id,
  activeResultTab: 'fullText',
  isUploading: false,
  showResult: false,
  apiFailure: false,
  result: {
    collectionId: '',
    message: ''
  },

  setCurrentTab: (tabName: string) => {
    set(() => ({ currentTab: tabName }));
  },

  setAcitveResultTab: (tabName: string) => {
    set(() => ({ activeResultTab: tabName }));
  },

  setApiFailure: (failureState: boolean) => {
    set(() => ({ apiFailure: failureState }));
  },

  handleFileUpload: async (formData: FormData) => {
    set(() => ({
      isUploading: true,
      showResult: false,
      apiFailure: false,
    }));

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Set result if success
      set(() => ({
        isUploading: false,
        showResult: true,
        apiFailure: false,
        result: response.data,
      }));
    } catch (error) {
      // Set errors
      set(() => ({
        isUploading: false,
        showResult: false,
        apiFailure: true,
      }));
      console.error("Error:", error);
    }
  },
}));
