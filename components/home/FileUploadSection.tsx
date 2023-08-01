import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DragAndDrop from "../common/DragAndDrop";

export const FileUploadSection = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (files) => {
    console.log(files[0]);
    setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push({
        pathname: "/chat",
        query: { collectionName: response.data?.collectionName },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
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
            className="button is-link mt-3"
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
