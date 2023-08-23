import React, { useEffect, useState } from "react";
import { useDashboard } from "../../store/useDashboard";
import Chat from "./Chat";
import { TabComponent } from "../common/TabComponent";
import { PDFObject } from 'react-pdfobject'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import ChatWidget from "./ChatWidget";
import { useAuth } from "../../store/useAuth"
import axios from "axios";

export const AfterUpload = () => {

  const router = useRouter()
  const {
    query: { id },
  } = router
  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function verifyCollection({ collectionId, userId }) {
      try {
        const { data: { isVerified } } = await axios.post("/api/verifyCollection", { collectionId, userId });
        setIsVerified(isVerified);
      }
      catch (err) {
        console.error("Error:", err);
      }
    }
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const collectionId = params.get('id');
    if (collectionId) {
      verifyCollection({ collectionId, userId: user?.uid })
    }
  }, [])

  const RenderPdf = () => {
    //if (apiFailure) return <>Error...</>;
    return (
      <>
        <PDFObject height="70vh" url={`http://localhost:3000/pdfs/${id}.pdf`} />
      </>
    );
  };

  const RenderResult = () => {
    return null;
  };

  //Get detailed summary of the doc

  const DetailedSummary = () => {
    return (
      <>
        Get detailed summary of the doc
      </>
    )
  }

  const tabConfig = {
    "Actual document": <RenderPdf />,
    "Summary": <DetailedSummary />,
  }

  return (
    <div id="doc-insight">
      {isVerified ?
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <TabComponent tabConfig={tabConfig} />
          </Box>
          <Box height={"70vh"}>
            <ChatWidget />
          </Box>
        </SimpleGrid> : <p>Not Verified</p>}
    </div>
  );
};
