import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploader;
