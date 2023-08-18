"use client";
import React from "react";
import { useModal } from "../../../store/useModal";
import { useAuth } from "../../../store/useAuth";

const LoginModal = () => {
  const { closeModal } = useModal((store) => ({
    activeModal: store.activeModal,
    closeModal: store.closeModal,
  }));

  const { googleLogin } = useAuth((store) => ({
    googleLogin: store.googleLogin,
  }));

  const handleClick = () => {
    googleLogin(closeModal);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>

      <div className="modal-card">
        <section className="modal-card-body box p-0">
          <div className="is-flex">
            <div>
              <img src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=2000&t=st=1692293795~exp=1692294395~hmac=6dc4ffe9a0a12dc6556b1c7fb055337f0ddace49aa0d1e8e70e0f5dd1b18e2ff" />
            </div>
            <div className="p-3">
              <button
                className="button is-danger is-rounded"
                onClick={handleClick}
              >
                <span className="icon">
                  <i className="fab fa-google"></i>
                </span>
                &nbsp;&nbsp; Signin With Google
              </button>
            </div>
          </div>
        </section>
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
};

export default LoginModal;
