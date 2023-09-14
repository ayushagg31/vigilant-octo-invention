import React, { useState, useEffect } from "react";
import { PDFObject, ViewMode } from "react-pdfobject";
import { Box, Flex, Show, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";
import ReactPlayer from "react-player/lazy";
import { useAuth } from "../../store/useAuth";
// import { useCollections } from "../../store/useCollections";
import { useAPIError } from "../../hooks/useApiHook";
import { verifyCollectionsApi } from "../../services/client.service";

export const AfterUpload = () => {
  const { addError } = useAPIError();
  const router = useRouter();
  const {
    asPath,
    query: { id, yt },
  } = router;

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  let youtubeUrl =
    yt !== undefined && !Array.isArray(yt) ? window.atob(yt) : null;

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function verifyCollection({ collectionId }) {
      setIsVerified(false);
      try {
        const {
          data: { isVerified },
        } = await verifyCollectionsApi({ collectionId });
        setIsVerified(isVerified);
      } catch (err) {
        addError("Error in verifying account");
      }
    }
    if (id) {
      verifyCollection({
        collectionId: id,
      });
    } else {
      router.replace("dashboard");
    }
  }, [id, user?.email]);

  const RenderPdf = () => {
    const [page, setPage] = useState(1);
    const hostUrl = window.location.origin;

    return (
      <>
        <PDFObject
          forcePDFJS
          pdfOpenParams={{
            navpanes: 0,
            statusbar: 0,
            view: ViewMode,
            pagemode: "thumbs",
          }}
          height={"100%"}
          url={`${hostUrl}/pdfs/${id}.pdf`}
        />
      </>
    );
  };

  const ChatAndTabJsx = (
    <Flex columns={{ sm: 1, md: 2 }} w="100%" className="main-container">
      <Show above="md">
        <Box borderWidth="1px" borderRadius="lg" h="100%" flex={1}>
          {youtubeUrl !== null ? (
            <ReactPlayer url={youtubeUrl} />
          ) : (
            <RenderPdf />
          )}
        </Box>
      </Show>
      <Box h="100%" flex={1}>
        <ChatWidget />
      </Box>
    </Flex>
  );
  const NotVerfiedJsx = (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text mt={4}>Loading your doc</Text>
    </Flex>
  );

  return <>{isVerified ? ChatAndTabJsx : NotVerfiedJsx}</>;
};
