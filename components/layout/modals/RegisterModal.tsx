import React from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../../../config/googleAuth.config";
import { signInWithPopup } from "firebase/auth";

const RegisterModal = () => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setValue(data?.user?.email);
      console.log(data);
    });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <h1>Register</h1>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
};

export default RegisterModal;
