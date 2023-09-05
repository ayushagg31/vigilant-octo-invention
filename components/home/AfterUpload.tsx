import React, { useState, useEffect, useMemo } from "react";
import Chat from "./Chat";
import { TabComponent } from "../common/TabComponent";
import { PDFObject, ViewMode } from 'react-pdfobject'
import { SimpleGrid, Box, useMediaQuery, VStack, StackDivider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import ChatWidget from "./ChatWidget";
import ReactPlayer from 'react-player/lazy'
import styles from "../../styles/Home.module.css";
import { useAuth } from "../../store/useAuth"
import axios from "axios";
import { useCollections } from "../../store/useCollections";
import { useAPIError } from "../../hooks/useApiHook";
import TagDoc from "./TagDoc";

export const AfterUpload = () => {

  const { addError } = useAPIError()
  const router = useRouter()
  const {
    asPath,
    query: { id, yt },
  } = router

  const { user } = useAuth((store) => ({
    user: store.user,
  }));
  const { collections } = useCollections((store) => {
    return {
      collections: store.collections,
    };
  });
  let youtubeUrl = yt !== undefined && !Array.isArray(yt) ? window.atob(yt) : null;


  const [isVerified, setIsVerified] = useState(false);
  // ssr-friendly media query with fallback
  const [isMaxWidth600] = useMediaQuery('(max-width: 600px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })


  useEffect(() => {
    async function verifyCollection({ collectionId, userEmail }) {
      try {
        const { data: { isVerified } } = await axios.post("/api/verifyCollection", { collectionId, userEmail });
        setIsVerified(isVerified);
      }
      catch (err) {
        addError('Error in verifying account');
      }
    }
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const collectionId = params.get('id');
    if (collectionId) {
      // TODO: TEST Email Setup
      verifyCollection({ collectionId, userEmail: user?.email || "agg.ayush.1997@gmail.com" })
    }
  }, [])


  const RenderPdf = () => {
    //if (apiFailure) return <>Error...</>;
    const viewMode:
      ViewMode = 'FitV';
    let pdfHeight = isMaxWidth600 ? "30vh" : "60vh"
    return (
      <>
        <PDFObject pdfOpenParams={{
          view: viewMode
        }} height={pdfHeight} url={`http://localhost:3000/pdfs/${id}.pdf`} />
      </>
    );
  };

  //Get detailed summary of the doc

  const DetailedSummary = () => {
    return (
      <>
        Get detailed summary of the doc
      </>
    )
  }

  const DocsList = () => {
    return (
      <div >
        {collections.map((collectionEl, index) =>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
          >
            <Box p={2}>
              <TagDoc key={index} collectionEl={collectionEl} size='lg' />
            </Box>

          </VStack>

        )}
      </div>
    );
  }

  const tabStyle = {
    marginTop: '5px',
    marginLeft: '5px'
  }
  const memoizedObject = useMemo(() => {
    return {
      "Actual document": youtubeUrl !== null ? <ReactPlayer url={youtubeUrl} /> : <RenderPdf />,
      "Summary": <DetailedSummary />,
      "All Docs": <DocsList />
    }

  }, [asPath]);

  const ChatAndTabJsx = (
    <SimpleGrid height='80vh' columns={{ sm: 1, md: 2 }} spacing={2}>
      <Box borderWidth='1px' borderRadius='lg'>
        <div style={tabStyle} >
          <TabComponent tabConfig={memoizedObject} />
        </div>
      </Box>
      <Box height={'75vh'}>
        <ChatWidget />
      </Box>
    </SimpleGrid>);

  const NotVerfiedJsx = <div>Not Verified</div >


  return (
    <div>
      {
        isVerified ? ChatAndTabJsx : NotVerfiedJsx
      }
    </div>
  );
};
