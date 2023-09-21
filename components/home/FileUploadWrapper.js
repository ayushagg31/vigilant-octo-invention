import React from "react";
import { Card, CardBody, Box } from "@chakra-ui/react";
import style from "../../styles/DragAndDrop.module.css";
export const FileUploadWrapper = ({ children }) => {
  return (
    <>
      <Card variant={"unstyled"} h="350px">
        <div className={style.uploadedFileSection}>
          <Box p={4} w={"100%"}>
            {children}
          </Box>
        </div>
      </Card>
    </>
  );
};
