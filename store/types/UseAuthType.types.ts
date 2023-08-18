export type UseAuthType = {
  user: null | any;
  setUser: (user) => void;
  logout: () => void;
  googleLogin: (closeModal: () => void) => void;
};