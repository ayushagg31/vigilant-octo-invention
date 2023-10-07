import React, { useEffect, useState } from "react";
import style from "./DocChat.module.css";
import { Box, Flex, Text, Show, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";
import { verifyCollectionsApi } from "../../services/client.service";
import LoaderScreen from "./LoaderScreen";
import { useAPIError } from "../../hooks/useApiHook";
import Head from "next/head";
import ReactPlayer from "react-player";
import { chatApi } from "../../services/client.service";
import { FaCheck } from "react-icons/fa";

const DocChatViewer = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { addError } = useAPIError();
  const [blogState, setBlogState] = useState("NULL");
  const [blogPost, setBlogPost] = useState("");
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
        if (!isVerified) {
          addError(
            "Document not available. It may have been deleted or you may not have permission to view it."
          );
          router.replace("dashboard");
        }
      } catch (err) {
        addError(err.message || "Failed to verify account");
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

  const generateBlogFromYT = async () => {
    const QUERY =
      "generate a detailed blog from this video with heading and point by point";
    setBlogState("LOADING");
    try {
      const response = await chatApi({
        question: QUERY,
        history: [],
        collectionId: id,
      });
      const data = await response.data;
      setBlogPost(data.message);
      setBlogState("READY");
    } catch (error) {
      console.log(response);
      setBlogState("ERROR");
    }
  };

  const copyBlogToClipboard = () => {
    navigator.clipboard.writeText(blogPost);
  };

  if (!isVerified) return <LoaderScreen />;

  return (
    <>
      <Head>
        <title>DocInsights | YourPDF.chat</title>
      </Head>
      <Flex
        h="100vh"
        w="100%"
        direction={{ base: "column", md: "row" }}
        flex={"1"}
        bg="#171923"
      >
        <Box className={`${style.docinsightSections} ${style.pdfSection}`}>
          <Box h="100%" overflowY="scroll">
            <Text
              fontSize="lg"
              p={"2"}
              color={"#37A169"}
              fontWeight={"bold"}
            >{`${name}`}</Text>
            <Show above="md">
              {youtubeUrl !== null ? (
                <>
                  <ReactPlayer url={youtubeUrl} />
                  <Box mt="4">
                    {blogState === "READY" ? (
                      <>
                        <Button onClick={copyBlogToClipboard} size="xs">
                          <Box mr="2">Copy blog post markdown to clipboard</Box>{" "}
                          <FaCheck color="green" />
                        </Button>
                      </>
                    ) : (
                      <Button onClick={generateBlogFromYT} size="xs">
                        <Box mr="2">Generate a blog post form this video</Box>
                        {blogState === "LOADING" && <Spinner size="xs" />}
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <iframe
                  src={`/api/view/${id}`}
                  width="100%"
                  height="100%"
                ></iframe>
              )}
            </Show>
          </Box>
        </Box>
        <Box className={`${style.docinsightSections} ${style.chatSection}`}>
          <Box h="100%" overflowY="scroll">
            <ChatWidget id={id} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DocChatViewer;
