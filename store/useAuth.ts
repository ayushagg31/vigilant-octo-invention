import { create } from "zustand";
import { UseAuthType } from "./types/UseAuthType.types";

export const useAuth = create<UseAuthType>((set) => ({
  user: null,
  logout: () => set({ user: null }),
  setUser: (userInfo) => set({ user: userInfo }),
}));
