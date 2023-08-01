import React from "react";
import style from "../../styles/DragAndDrop.module.css";

const DragAndDrop = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInput = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect?.(e.dataTransfer.files)
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files)
    }
  };

  const triggerFileUpload = () => {
    fileInput.current.click();
  };

  return (
    <form onDragEnter={handleDrag} onSubmit={(e) => {e.preventDefault();e.stopPropagation()}}>
      <div className={style.fileUploadForm}>
        <input
          ref={fileInput}
          type="file"
          id="input-file-upload"
          multiple={true}
          className={style.fileInput}
          onChange={handleChange}
          accept="application/pdf"
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={`${style.fileInputLabel} ${dragActive ? style.dragActive : ""}`}
        >
          <div>
            <p>Drag and drop your PDF file here</p>
            <p>Or</p>
            <button className={style.uploadButton} onClick={triggerFileUpload}>Upload a PDF file</button>
          </div>
        </label>
        {dragActive && (
          <div
            className={style.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </div>
    </form>
  );
};

export default DragAndDrop;
