import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const FileUploadSection = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="file is-success is-boxed is-justify-content-center	">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            accept="application/pdf"
            name="files"
            onChange={handleFileChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-cloud-upload-alt"></i>
            </span>
            <span className="file-label">Select a PDF file</span>
          </span>
        </label>
      </div>
    </form>
  );
};
