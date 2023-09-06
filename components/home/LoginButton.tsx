"use client";
import React from "react";
import { useModal } from "../../store/useModal";
import { useAuth } from "../../store/useAuth";
import { useDisclosure, Button, Text } from "@chakra-ui/react";
import { LoginModal } from "./LoginModal";

function LoginButton() {
  const { openModal } = useModal((store) => ({
    openModal: store.openModal,
  }));

  const { user, logout } = useAuth((store) => ({
    user: store.user,
    logout: store.logout,
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="is-flex is-align-items-center is-flex-direction-column">
        {user ? (
          <>
            <Text>Hi, {user?.displayName}</Text>
            <br />
            <button className="button is-info is-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Button onClick={onOpen}>Sign In</Button>
        )}
      </div>
      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
export default LoginButton;
