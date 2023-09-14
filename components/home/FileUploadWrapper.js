import React from "react";
import { Card, CardBody, Box } from "@chakra-ui/react";
import style from "../../styles/DragAndDrop.module.css";
export const FileUploadWrapper = ({ children }) => {
  return (
    <>
      <Card variant={"outline"}>
        <CardBody>
          <div className={style.uploadedFileSection}>
            <Box p={4}>{children}</Box>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
