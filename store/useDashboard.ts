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
  result: null,

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
      result: null,
    }));

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Set result
      set(() => ({
        isUploading: false,
        showResult: true,
        apiFailure: true,
        result: response,
      }));
    } catch (error) {

      // Setting fake success
      
      set(() => ({
        isUploading: false,
        showResult: true,
        apiFailure: false,
        result: {
          fullText: 'afsdfasd',
          summary: 'Lorem fsadf sdafds fsd',
          conciseSummary: 'Short summary of lorem fsadf sdafds fsd',
        },
      }));
      // Setting fake success end

      // Set errors
      // set(() => ({
      //   isUploading: false,
      //   showResult: false,
      //   apiFailure: true,
      //   response: null,
      // }));
      // console.error("Error:", error);
    }
  },
}));
