import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import isUrl from "is-url";
import { FileUploadWrapper } from "./FileUploadWrapper";
import { useAPIError, useAPILoader } from "../../hooks/useApiHook";
import { useRouter } from "next/router";
import { youtubeTranscribeApi } from "../../services/client.service";
import RandomLoader from "../common/RandomLoader";
import { useCollections } from "../../store/useCollections";

import { getAnalytics, logEvent } from "firebase/analytics";
import {useEffect} from 'react'
import { app } from "../../config/googleAuth.config";
import { UPLOAD_YOUTUBE } from "../../constants/analytics.constants";

let analytics;
export const FromYtubeUrl = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { addError } = useAPIError();
  const { loader, addLoader, removeLoader } = useAPILoader();
  const { fetchCollections } = useCollections();

  useEffect(() => {
    analytics = getAnalytics(app);
  }, []);

  const saveAsAudio = async (e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    setError(false);
    if (isUrl(url)) {
      try {
        logEvent(analytics, UPLOAD_YOUTUBE);
        addLoader();
        const response = await youtubeTranscribeApi({ ytUrl: url });
        const {
          data: { collectionId, collectionName, ytUrl },
        } = response;
        removeLoader();
        fetchCollections();
        router.push({
          pathname: "docinsights",
          query: { id: collectionId, yt: btoa(ytUrl), name: collectionName },
        });
      } catch (error) {
        removeLoader();
        addError(error.message || "Something went wrong, Please try again later.");
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <FileUploadWrapper>
        <form onSubmit={saveAsAudio} style={{ height: "100%" }}>
          <Flex
            justifyContent={"center"}
            padding={"1rem"}
            direction={"column"}
            height={"100%"}
            alignItems={"center"}
            gap="1rem"
          >
            {!loader ? (
              <>
                <input
                  className={`input is-fullwidth  ${error ? "is-danger" : ""}`}
                  type="text"
                  name="url"
                  placeholder="Provide a Youtube Video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)"
                  style={{ padding: "1.5rem", borderRadius: "4px" }}
                />

                {error && <p className="has-text-danger">Invalid URL</p>}
                <Button
                  isLoading={loader}
                  type="submit"
                  loadingText="Processing your file..."
                  variant="outline"
                  style={{
                    background: "#37A169",
                    alignSelf: "flex-end",
                    color: "#fff",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  Upload
                </Button>
              </>
            ) : (
              <>
                <RandomLoader color="#37A169" />
                <Text color="white">Processing your video...</Text>
              </>
            )}
          </Flex>
        </form>
      </FileUploadWrapper>
    </>
  );
};
