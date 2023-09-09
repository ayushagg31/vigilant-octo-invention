export type UseAuthType = {
  user: null | any;
  userToken: null | any;
  loadingUser: boolean;
  setUser: (user) => void;
  setUserToken: (userToken) => void;
  logout: () => void;
  googleLogin: (closeModal: () => void) => void;
};
