import React, { useState, useEffect, useMemo, useRef } from "react";
import { TabComponent } from "../common/TabComponent";
import { PDFObject, ViewMode } from "react-pdfobject";
import {
  SimpleGrid,
  Box,
  useMediaQuery,
  VStack,
  StackDivider,
  Flex,
  Show,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";
import ReactPlayer from "react-player/lazy";
import { useAuth } from "../../store/useAuth";
import { useCollections } from "../../store/useCollections";
import { useAPIError } from "../../hooks/useApiHook";
import TagDoc from "./TagDoc";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyCollection({ collectionId }) {
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
    <Flex
      columns={{ sm: 1, md: 2 }}
      w="100%"
      h={{ lg: "100%", sm: "calc(100% - 73px)" }}
    >
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
  const NotVerfiedJsx = <div>Not Verified</div>;

  return <>{isVerified ? ChatAndTabJsx : NotVerfiedJsx}</>;
};
