import React, { useState } from "react";
import { Button, Box, Progress } from "@chakra-ui/react";
import isUrl from "is-url";
import { FileUploadWrapper } from "./FileUploadWrapper";
import { useAPIError, useAPILoader } from "../../hooks/useApiHook";
import { useRouter } from "next/router";
import { youtubeTranscribeApi } from "../../services/client.service";

export const FromYtubeUrl = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { addError } = useAPIError();
  const { loader, addLoader, removeLoader } = useAPILoader();

  const saveAsAudio = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    setError(false);
    if (isUrl(url)) {
      try {
        addLoader();
        const response = await youtubeTranscribeApi({ ytUrl: url });
        const {
          data: { collectionId, ytUrl },
        } = response;
        removeLoader();
        router.push({
          pathname: "dashboard/docinsights",
          query: { id: collectionId, yt: btoa(ytUrl) },
        });
      } catch (error) {
        removeLoader();
        addError("error in fetching youtube link");
        console.error("Error:", error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Box boxShadow={'md'}>
        <FileUploadWrapper>
          <form onSubmit={saveAsAudio}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className={`input is-fullwidth ${error ? "is-danger" : ""}`}
                  type="text"
                  name="url"
                  placeholder="Enter Youtube URL. Ex: https://www.youtube.com/watch?v=abcdef"
                />
                {error && <p className="has-text-danger">Invalid URL</p>}
              </div>
              <div className="control">
                <Button
                  isLoading={loader}
                  type="submit"
                  border="2px"
                  borderColor="black"
                  variant="outline"
                >
                  Upload
                </Button>
              </div>
            </div>
          </form>
          <Box p={5}>
            {loader && <Progress size="xs" colorScheme="gray" isIndeterminate />}
          </Box>
        </FileUploadWrapper>
      </Box>
    </>
  );
};
