import { create } from "zustand";
import axios from "axios";
import { AllModels, UseModalType } from "./types/UseModalType.types";

export const useModal = create<UseModalType>((set) => ({
  activeModal: "",
  openModal: (activeModal: AllModels) => {
    set({ activeModal: activeModal });
  },
  closeModal: () => set({ activeModal: "" }),
}));
