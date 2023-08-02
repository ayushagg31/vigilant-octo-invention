import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DragAndDrop from "../common/DragAndDrop";
import { useDashboard } from "../../store/useDashboard";

export const FileUploadSection = () => {
  const router = useRouter();

  const { isUploading, handleFileUpload, apiFailure, setApiFailure } =
    useDashboard((store) => {
      return {
        handleFileUpload: store.handleFileUpload,
        isUploading: store.isUploading,
        apiFailure: store.apiFailure,
        setApiFailure: store.setApiFailure,
      };
    });

  const [file, setFile] = useState(null);

  const handleFileChange = (files) => {
    setApiFailure(false);
    setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    handleFileUpload(formData);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      {file && !isUploading && apiFailure && (
        <div className="notification is-danger">
          <button
            className="delete"
            onClick={() => setApiFailure(false)}
          ></button>
          Server error! Please try after some time.
        </div>
      )}
      {!file ? (
        <DragAndDrop onFileSelect={handleFileChange} />
      ) : (
        <>
          <div className="is-flex">
            <h1 className="mr-2">{file?.name}</h1>
            <div onClick={removeFile}>
              <i className="fa fa-trash"></i>
            </div>
          </div>
          <button
            className={`button is-link mt-3 ${isUploading ? "is-loading" : ""}`}
            onClick={handleSubmit}
            disabled={!file}
          >
            Upload
          </button>
        </>
      )}
      <div className="buttons is-right"></div>
    </>
  );
};
