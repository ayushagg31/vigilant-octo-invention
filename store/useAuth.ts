import { create } from "zustand";
import { UseAuthType } from "./types/UseAuthType.types";
import { auth, provider } from "../config/googleAuth.config";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from '../services/client.service'

export const useAuth = create<UseAuthType>((set) => ({
  user: null,
  userToken: null,
  logout: () => {
    signOut(auth).then(
      () => {
        set({ user: null });
        setUserToken(null);
      },
      (e) => {
        // logEvent(analytics, e.message);
        console.error(e.message);
      }
    );
  },
  setUser: (userInfo) => set({ user: userInfo }),
  setUserToken: (userToken) => set({ userToken }),
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
const setUserToken = useAuth.getState().setUserToken;

const updateUserTokenToState = (user) => {
  if (user !== null) {
    user?.getIdToken().then((token) => {
      setUserToken(token);
    });
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
    updateUserTokenToState(user);
  } else {
    setUser(null);
    setUserToken(null);
  }
});
