import React, { useState, useEffect, useMemo, useRef } from "react";
import { TabComponent } from "../common/TabComponent";
import { PDFObject, ViewMode } from "react-pdfobject";
import {
  SimpleGrid,
  Box,
  useMediaQuery,
  VStack,
  StackDivider,
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
    //if (apiFailure) return <>Error...</>;
    const viewMode = "FitV";
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const hostUrl = window.location.origin;

    return (
      <>
        <PDFObject
          forcePDFJS
          pdfOpenParams={{
            navpanes: 0,
            statusbar: 0,
            view: ViewMode,
            pagemode: "none",
          }}
          height={"100%"}
          url={`${hostUrl}/pdfs/${id}.pdf`}
        />
      </>
    );
  };

  //Get detailed summary of the doc

  const DetailedSummary = () => {
    return <>Get detailed summary of the doc</>;
  };

  // const DocsList = () => {
  //   return collections.map((collectionEl, index) => (
  //     <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
  //       <Box h="full" p={2}>
  //         <TagDoc key={index} collectionEl={collectionEl} size="lg" />
  //       </Box>
  //     </VStack>
  //   ));
  // };

  // const memoizedObject = useMemo(() => {
  //   return {
  //     "Actual document":
  //       youtubeUrl !== null ? <ReactPlayer url={youtubeUrl} /> : <RenderPdf />,
  //     Summary: <DetailedSummary />,
  //     "All Docs": <DocsList />,
  //   };
  // }, [asPath]);

  const ChatAndTabJsx = (
    <SimpleGrid columns={{ sm: 1, md: 2 }} w="100%">
      <Show above="md">
        <Box borderWidth="1px" borderRadius="lg" h="100%">
          {youtubeUrl !== null ? (
            <ReactPlayer url={youtubeUrl} />
          ) : (
            <RenderPdf />
          )}
        </Box>
      </Show>
      <Box>
        <ChatWidget />
      </Box>
    </SimpleGrid>
  );
  const NotVerfiedJsx = <div>Not Verified</div>;

  return <>{isVerified ? ChatAndTabJsx : NotVerfiedJsx}</>;
};
