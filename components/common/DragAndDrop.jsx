import React from "react";
import { Text, Center, Stack } from "@chakra-ui/react";
import style from "../../styles/DragAndDrop.module.css";
import { FaFilePdf } from "react-icons/fa6";

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
      onFileSelect?.(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files);
    }
  };

  const triggerFileUpload = () => {
    fileInput.current.click();
  };

  return (
    <form
      style={{
        height: "100%",
        width: "100%",
      }}
      onDragEnter={handleDrag}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        id="drag-input"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
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
          className={`${style.fileInputLabel} ${
            dragActive ? style.dragActive : ""
          }`}
        >
          <div>
            <Center p={2}>
              <FaFilePdf size="30px" />
            </Center>
            <Stack spacing={2}>
              <Center>
                <Text fontSize="sm" as="b">
                  Click to upload or Drag & drop
                </Text>
              </Center>
            </Stack>
            <button
              className={style.uploadButton}
              onClick={triggerFileUpload}
            ></button>
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
