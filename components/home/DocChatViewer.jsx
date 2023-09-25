import React, { useEffect, useState } from "react";
import style from "./DocChat.module.css";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";
import { verifyCollectionsApi } from "../../services/client.service";
import LoaderScreen from "./LoaderScreen";

const DocChatViewer = () => {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const {
    query: { id, name, yt },
  } = router;

  let youtubeUrl =
    yt !== undefined && !Array.isArray(yt) ? window.atob(yt) : null;

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

  if (!isVerified) return <LoaderScreen />;

  return (
    <Flex
      h="100vh"
      w="100%"
      direction={{ base: "column", md: "row" }}
      flex={"1"}
    >
      <Box className={`${style.docinsightSections} ${style.pdfSection}`}>
        <Box h="100%" overflowY="scroll">
          {youtubeUrl !== null ? (
            <ReactPlayer url={youtubeUrl} />
          ) : (
            <iframe src={`/api/view/${id}`} width="100%" height="100%"></iframe>
          )}
        </Box>
      </Box>
      <Box className={`${style.docinsightSections} ${style.chatSection}`}>
        <Box h="100%" overflowY="scroll">
          <ChatWidget />
        </Box>
      </Box>
    </Flex>
  );
};

export default DocChatViewer;
