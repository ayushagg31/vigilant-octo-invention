import React from "react";
import {
  Card,
  CardBody,
  Icon,
  Text,
  Center,
  Circle,
  Stack,
} from "@chakra-ui/react";
import style from "../../styles/DragAndDrop.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

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
      onDragEnter={handleDrag}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Card variant={"outline"} h="300px">
        <CardBody>
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
                <Circle size="40px" bg="black" color="white">
                  <AiOutlineCloudUpload size="30px" />
                </Circle>
              </Center>
              <Stack spacing={2}>
                <Center>
                  <Text fontSize="sm" as="b">
                    Click to upload{" "}
                  </Text>{" "}
                  <Text fontSize="sm">{`\u00A0\ or drag and drop`}</Text>
                </Center>

                <Text fontSize="xs">
                  Supported formats: .pdf', '.txt', '.epub', '.rtf
                </Text>
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
        </CardBody>
      </Card>
    </form>
  );
};

export default DragAndDrop;
