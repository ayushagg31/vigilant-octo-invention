"use client";
import React from "react";

const RegisterModal = () => {
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
