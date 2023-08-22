import React, { useState } from "react";
import isUrl from "is-url";
import axios from "axios";
import { useAuth } from "../../store/useAuth"

export const FromUrl = () => {
  const [error, setError] = useState(false);
  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const saveAsPDF = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    setError(false);
    if (isUrl(url) && url.endsWith(".pdf")) {
      try {
        await axios.post("/api/download", { pdfUrl: url, userId: user.uid });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={saveAsPDF}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className={`input is-fullwidth ${error ? "is-danger" : ""}`}
              type="text"
              name="url"
              placeholder="Enter PDF URL. Ex: https://url.com/path/file.pdf"
            />
            {error && <p className="has-text-danger">Invalid URL</p>}
          </div>
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
