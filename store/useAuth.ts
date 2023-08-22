import { create } from "zustand";
import { UseAuthType } from "./types/UseAuthType.types";
import { auth, provider } from "../config/googleAuth.config";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from '../config/firestore.config'

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
  googleLogin: (closeModal) => {
    signInWithPopup(auth, provider).then((data) => {
      createUser();
      setUser(data?.user);
      closeModal();
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
