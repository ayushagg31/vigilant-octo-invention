export type AllModels = "" | "login" | "register";

export type UseModalType = {
  activeModal: AllModels;
  openModal: (activeModal: AllModels) => void;
  closeModal: () => void;
};
