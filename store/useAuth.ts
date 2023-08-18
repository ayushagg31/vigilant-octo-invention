import { create } from "zustand";
import { UseAuthType } from "./types/UseAuthType.types";
import { auth, provider } from "../config/googleAuth.config";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

export const useAuth = create<UseAuthType>((set) => ({
  user: null,
  logout: () => {
    signOut(auth).then(
      () => {
        set({ user: null });
      },
      (e) => {
        // logEvent(analytics, e.message);
        console.error(e.message);
      }
    );
  },
  setUser: (userInfo) => set({ user: userInfo }),
  googleLogin: () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data?.user);
    });
  },
}));

// Auto login on change
const setUser = useAuth.getState().setUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
  } else {
    setUser(null);
  }
});
