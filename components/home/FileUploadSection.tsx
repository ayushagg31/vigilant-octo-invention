import React, { useState } from "react";
import { Text, VStack, Box, Flex, Button, Progress, Card, Center, Tag, HStack } from "@chakra-ui/react";
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
        data: { collectionId, collectionName },
      } = response;
      removeLoader();
      router.push({
        pathname: "dashboard/docinsights",
        query: { id: collectionId, name: collectionName },
      });
    } catch (err) {
      removeLoader();
      addError("Failed to upload document");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      <Card>
        <div id="file-upload-section">
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
            <FileUploadWrapper>
              <DragAndDrop onFileSelect={handleFileChange} />
            </FileUploadWrapper>

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
                    variant="outline"
                    onClick={handleSubmit}
                    isLoading={loader}
                    loadingText="processing your file.."
                    disabled={!file}
                    colorScheme='whiteAlpha'
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
        </div>
      </Card>
    </>
  );
};
