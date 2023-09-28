import { create } from "zustand";
import { UseAuthType } from "./types/UseAuthType.types";
import { auth, provider } from "../config/googleAuth.config";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from "../services/client.service";

export const useAuth = create<UseAuthType>((set) => ({
  user: null,
  loadingUser: true,
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
  setUser: (userInfo) => set({ user: userInfo, loadingUser: false }),
  setUserToken: (userToken) => set({ userToken, loadingUser: false }),
  googleLogin: (closeModal, fn = null) => {
    signInWithPopup(auth, provider).then(async (data) => {
      await createUser();
      setUser(data?.user);
      closeModal();
      if (fn !== null) {
        fn();
      }
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
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUser(user);
    updateUserTokenToState(user);
  } else {
    setUser(null);
    setUserToken(null);
  }
});
