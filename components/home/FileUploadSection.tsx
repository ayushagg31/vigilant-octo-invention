import React, { useState } from "react";
import { Text, VStack, Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DragAndDrop from "../common/DragAndDrop";
import { useDashboard } from "../../store/useDashboard";
import { uploadDocumentApi } from "../../services/client.service";
import { FileUploadWrapper } from "./FileUploadWrapper";
import { useAPIError, useAPILoader } from "../../hooks/useApiHook";
import RandomLoader from "../common/RandomLoader"

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
      <div id="file-upload-section" >
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
          <FileUploadWrapper type="upload">
            <DragAndDrop onFileSelect={handleFileChange} />
          </FileUploadWrapper>

        ) : (
          <FileUploadWrapper>
            <VStack spacing={4} style={{ height: "100%" }}>
              <Flex direction="column"
                gap="1rem"
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}>
                {!loader ? <>
                  <Box>
                    <Flex>
                      <div className="mr-5">
                        <Text as="b" fontSize="lg">
                          {file?.name}
                        </Text>
                      </div>
                      <div onClick={removeFile} style={{ cursor: "pointer" }}>
                        <i className="fa fa-trash"></i>
                      </div>
                    </Flex>
                  </Box>
                  <Box>
                    <Button
                      variant="outline"
                      onClick={handleSubmit}
                      isLoading={loader}
                      loadingText="Processing your file..."
                      disabled={!file}
                      style={{ background: "#37A169", alignSelf: "flex-end", color: "#fff", padding: "1.25rem 1.5rem" }}
                    >
                      Upload
                    </Button>
                  </Box>
                </> :
                  <>
                    <RandomLoader color="#37A169" />
                    <Text>Processing your file...</Text>
                  </>}
              </Flex>
            </VStack>
          </FileUploadWrapper>
        )}
      </div >
    </>
  );
};
