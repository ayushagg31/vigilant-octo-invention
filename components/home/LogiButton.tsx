"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "../../store/useModal";
import { useAuth } from "../../store/useAuth";
// import LoginModal from "../layout/modals/LoginModal";

function LogiButton() {
  const { openModal } = useModal((store) => ({
    openModal: store.openModal,
  }));

  const { user, logout } = useAuth((store) => ({
    user: store.user,
    logout: store.logout,
  }));

  return (
    <div className="is-flex is-align-items-center">
      {user ? (
        <>
          <p className="mr-3">Hi, {user?.displayName}</p>
          <button className="button is-info is-light" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button
          className="button is-info is-light"
          onClick={() => openModal("login")}
        >
          Login
        </button>
      )}
    </div>
  );
}
export default LogiButton;
