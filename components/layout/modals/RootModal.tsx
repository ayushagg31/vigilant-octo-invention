"use client";
import React from "react";
import { useModal } from "../../../store/useModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const NoopModal = () => null;
const RootModal = () => {
  const { activeModal, closeModal } = useModal((store) => ({
    activeModal: store.activeModal,
    closeModal: store.closeModal,
  }));

  const availableModals = {
    login: LoginModal,
    register: RegisterModal,
  };
  const ActiveModal = availableModals[activeModal] || NoopModal;
  return <ActiveModal />;
};

export default RootModal;
