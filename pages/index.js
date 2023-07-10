import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import isUrl from "is-url";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

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

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
  };

  const saveAsPDF = async (e) => {
    e.preventDefault();
    if (isUrl(url)) {
      try {
        const response = await axios.post("/api/download", { pdfUrl: url });
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Invalid URL");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      <form onSubmit={saveAsPDF}>
        <input type="url" onChange={handleUrlChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FileUploader;
