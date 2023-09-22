import React, { useState, useEffect } from "react";
import { Box, Flex, Show, Spinner, Text, Img } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";
import ReactPlayer from "react-player/lazy";
import { useAuth } from "../../store/useAuth";
// import { useCollections } from "../../store/useCollections";
import { useAPIError } from "../../hooks/useApiHook";
import { verifyCollectionsApi } from "../../services/client.service";

const AfterUpload = () => {
  const { addError } = useAPIError();
  const router = useRouter();
  const {
    query: { id, name, yt },
  } = router;

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
        router.replace("dashboard");
      }
    }
    if (id) {
      verifyCollection({
        collectionId: id,
      });
    } else {
      router.replace("dashboard");
    }
  }, [id]);

  const RenderPdf = () => {
    return (
      <Flex direction="column" height="100%">
        <Text
          fontSize="sm"
          p={"2"}
          color={"#fff"}
          fontWeight={"bold"}
        >{`${name}`}</Text>
        <div style={{ flex: 1 }}>
          <iframe src={`/api/view/${id}`} width="100%" height="100%"></iframe>
        </div>
      </Flex>
    );
  };

  const ChatAndTabJsx = (
    <Flex columns={{ sm: 1, md: 2 }} w="100%" className="main-container">
      <Show above="md">
        <Box h="100%" flex={1}>
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
        color="white.500"
        size="xl"
      />

      <Img src="/images/rocket.png" className="rocket-animation loading-doc" />
      <Text mt={4} color={"#fff"}>
        Loading your doc
      </Text>
    </Flex>
  );

  return <>{isVerified ? ChatAndTabJsx : NotVerfiedJsx}</>;
};

export default AfterUpload;
