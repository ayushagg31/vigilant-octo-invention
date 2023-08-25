export type UseAuthType = {
  user: null | any;
  userToken: null | any;
  setUser: (user) => void;
  setUserToken: (userToken) => void;
  logout: () => void;
  googleLogin: (closeModal: () => void) => void;
};
