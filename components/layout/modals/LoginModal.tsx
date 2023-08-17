import React from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../../../config/googleAuth.config";
import { signInWithPopup } from "firebase/auth";
import { useModal } from "../../../store/useModal";
import { useAuth } from "../../../store/useAuth";

const LoginModal = () => {
  const { activeModal, closeModal } = useModal((store) => ({
    activeModal: store.activeModal,
    closeModal: store.closeModal,
  }));

  const { setUser } = useAuth((store) => ({
    setUser: store.setUser,
  }));

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data?.user);
      // console.log(data);
      closeModal();
    });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>

      <div className="modal-content">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=2000&t=st=1692293795~exp=1692294395~hmac=6dc4ffe9a0a12dc6556b1c7fb055337f0ddace49aa0d1e8e70e0f5dd1b18e2ff" />
            </div>
            <div className="column">
              <div className="notification is-primary h-full">
                <button className="button is-rounded" onClick={handleClick}>
                  Signin With Google
                </button>
              </div>
            </div>
          </div>
        </div>
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
