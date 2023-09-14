import React, { useState } from "react";
import { Text, VStack, Box, Flex, Button, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DragAndDrop from "../common/DragAndDrop";
import { useDashboard } from "../../store/useDashboard";
import { uploadDocumentApi } from "../../services/client.service";
import { FileUploadWrapper } from "./FileUploadWrapper";
import { useAPIError, useAPILoader } from "../../hooks/useApiHook";

export const FileUploadSection = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { addError } = useAPIError();
  const { loader, addLoader, removeLoader } = useAPILoader();

  const { isUploading, handleFileUpload, apiFailure, setApiFailure } =
    useDashboard((store) => {
      return {
        handleFileUpload: store.handleFileUpload,
        isUploading: store.isUploading,
        apiFailure: store.apiFailure,
        setApiFailure: store.setApiFailure,
      };
    });

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
    try {
      addLoader();
      const response = await uploadDocumentApi({ formData });
      const {
        data: { collectionId },
      } = response;
      removeLoader();
      router.push({
        pathname: "dashboard/docinsights",
        query: { id: collectionId },
      });
    } catch (err) {
      removeLoader();
      console.log(err, "Err");
      addError("Failed to upload document");
      console.error("Error:", error);
    }
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
          <VStack spacing={4} align="stretch">
            <Box>
              <Flex>
                <div className="mr-5">
                  <Text as="b" fontSize="sm">
                    {file?.name}
                  </Text>
                </div>
                <div onClick={removeFile}>
                  <i className="fa fa-trash"></i>
                </div>
              </Flex>
            </Box>
            <Box>
              <Button
                border="2px"
                borderColor="black"
                variant="outline"
                onClick={handleSubmit}
                isLoading={loader}
                loadingText="processing your file.."
                disabled={!file}
              >
                Upload
              </Button>
            </Box>
            <Box>
              {loader && (
                <Progress size="xs" colorScheme="gray" isIndeterminate />
              )}
            </Box>
          </VStack>
        </FileUploadWrapper>
      )}
      <div className="buttons is-right"></div>
    </>
  );
};
