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
  const { addError } = useAPIError();
  const { loader, addLoader, removeLoader } = useAPILoader();

  const { isUploading, apiFailure, setApiFailure } =
    useDashboard((store) => {
      return {
        isUploading: store.isUploading,
        apiFailure: store.apiFailure,
        setApiFailure: store.setApiFailure,
      };
    });

  const [doc, setDoc] = useState(null);

  const handleSubmit = async (files) => {
    setApiFailure(false);
    let file = files[0]
    setDoc(file);
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
        pathname: "docinsights",
        query: { id: collectionId, name: collectionName },
      });
    } catch (err) {
      removeLoader();
      addError("Failed to upload document");
    }
  };

  return (
    <>
      <div id="file-upload-section" >
        {doc && !isUploading && apiFailure && (
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={() => setApiFailure(false)}
            ></button>
            Server error! Please try after some time.
          </div>
        )}
        {!doc ? (
          <FileUploadWrapper type="upload">
            <DragAndDrop onFileSelect={handleSubmit} />
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
                          {doc?.name}
                        </Text>
                      </div>
                    </Flex>
                  </Box>
                </> :
                  <>
                    <RandomLoader color="#37A169" />
                    <Text>{`Processing ${doc?.name}...`}</Text>
                  </>}
              </Flex>
            </VStack>
          </FileUploadWrapper>
        )}
      </div >
    </>
  );
};
