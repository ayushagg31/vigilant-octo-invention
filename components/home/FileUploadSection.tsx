import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Icon, Text, Center, Circle, VStack, Box, Flex, Spacer, Button, Progress } from '@chakra-ui/react'
import { useRouter } from "next/router";
import DragAndDrop from "../common/DragAndDrop";
import { useDashboard } from "../../store/useDashboard";
import { useAuth } from "../../store/useAuth"
import { FileUploadWrapper } from "./FileUploadWrapper"
import style from "../../styles/DragAndDrop.module.css";
export const FileUploadSection = () => {
  const router = useRouter();

  const { isUploading, handleFileUpload, apiFailure, setApiFailure } =
    useDashboard((store) => {
      return {
        handleFileUpload: store.handleFileUpload,
        isUploading: store.isUploading,
        apiFailure: store.apiFailure,
        setApiFailure: store.setApiFailure,
      };
    });

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const [file, setFile] = useState(null);

  const handleFileChange = (files) => {
    setApiFailure(false);
    setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.uid)
    handleFileUpload(formData);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      {file && !isUploading && apiFailure && (
        <div className="notification is-danger">
          <button
            className="delete"
            onClick={() => setApiFailure(false)}
          ></button>
          Server error! Please try after some time.
        </div>
      )}
      {!file ? (
        <DragAndDrop onFileSelect={handleFileChange} />
      ) : (
        <FileUploadWrapper>
          <VStack
            spacing={4}
            align='stretch'
          >
            <Box>
              <Flex>
                <div className="mr-5">
                  <Text as='b' fontSize='sm'>{file?.name}</Text>
                </div>
                <div onClick={removeFile}>
                  <i className="fa fa-trash"></i>
                </div>
              </Flex>

            </Box>
            <Box>
              <Button
                border='2px'
                borderColor='black'
                variant='outline'
                onClick={handleSubmit}
                isLoading={isUploading}
                loadingText='Uploading...'
                disabled={!file}>
                Upload
              </Button>
            </Box>
            <Box>
              {
                isUploading && <Progress size='xs' colorScheme="gray" isIndeterminate />
              }
            </Box>
          </VStack>
        </FileUploadWrapper>
      )}
      <div className="buttons is-right"></div>
    </>
  );
};
