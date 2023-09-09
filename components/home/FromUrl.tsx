import React, { useState } from "react";
import { Button, Box, Progress } from '@chakra-ui/react'
import isUrl from "is-url";
import { FileUploadWrapper } from "./FileUploadWrapper";
import { useAPIError, useAPILoader } from "../../hooks/useApiHook";
import { useRouter } from "next/router";
import { downloadDocApi } from "../../services/client.service"

export const FromUrl = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { addError } = useAPIError();
  const { loader, addLoader, removeLoader } = useAPILoader();

  const saveAsPDF = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    setError(false);
    if (isUrl(url) && url.endsWith(".pdf")) {
      try {
        addLoader();
        const response = await downloadDocApi({ pdfUrl: url });
        const { data: { collectionId } } = response;
        removeLoader()
        router.push({ pathname: 'dashboard/docinsights', query: { id: collectionId } });
      } catch (error) {
        removeLoader();
        addError('error in downloading document')
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <FileUploadWrapper>
        <form onSubmit={saveAsPDF}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className={`input is-fullwidth ${error ? "is-danger" : ""}`}
                type="text"
                name="url"
                placeholder="Enter PDF URL. Ex: https://url.com/path/file.pdf"
              />
              {error && <p className="has-text-danger">Invalid URL</p>}
            </div>
            <div className="control">
              <Button
                isLoading={loader}
                type="submit"
                border='2px'
                borderColor='black'
                variant='outline'>
                Upload
              </Button>
            </div>
          </div>
        </form>
        <Box p={5}>
          {
            loader && <Progress size='xs' colorScheme="gray" isIndeterminate />
          }
        </Box>
      </FileUploadWrapper>

    </>
  );
};