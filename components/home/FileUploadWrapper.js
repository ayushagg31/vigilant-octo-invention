import React from "react";
import { Box } from "@chakra-ui/react";
import style from "../../styles/DragAndDrop.module.css";
export const FileUploadWrapper = ({ type = null, children }) => {
  return (
    <>
      <div
        className={style.uploadedFileSection}
        style={{ borderWidth: type !== "upload" ? "none" : "2px" }}
      >
        <Box w={"100%"} h={"100%"} transform="translateY(-50%, -50%)">
          {children}
        </Box>
      </div>
    </>
  );
};
