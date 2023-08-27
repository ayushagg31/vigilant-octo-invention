import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { TabComponent } from "../common/TabComponent";
import { PDFObject, ViewMode } from 'react-pdfobject'
import { SimpleGrid, Box, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import ChatWidget from "./ChatWidget";
import styles from "../../styles/Home.module.css";
import { useAuth } from "../../store/useAuth"
import axios from "axios";
import { useCollections } from "../../store/useCollections";
import useAPIError from "../../hooks/useApiErrorHook";

export const AfterUpload = () => {

  const { addError } = useAPIError()
  const router = useRouter()
  const {
    query: { id },
  } = router
  const { user } = useAuth((store) => ({
    user: store.user,
  }));
  const { collections } = useCollections((store) => {
    return {
      collections: store.collections,
    };
  });



  const [isVerified, setIsVerified] = useState(false);
  // ssr-friendly media query with fallback
  const [isMaxWidth600] = useMediaQuery('(max-width: 600px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })


  useEffect(() => {
    async function verifyCollection({ collectionId, userId }) {
      try {
        const { data: { isVerified } } = await axios.post("/api/verifyCollection", { collectionId, userId });
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
      verifyCollection({ collectionId, userId: user?.uid || "3D9dxgUuxjPs3XX5HVpyk8vGyzv2" })
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
      <div style={{ display: "flex", color: "#000" }}>
        {collections.map(({ collectionId, collectionName }) =>
          <div style={{ width: "300px", height: "100px", textAlign: "center", margin: "auto", border: "1px solid black" }}>
            <a href={`/docinsights?id=${collectionId}`} >{collectionName}</a>
          </div>
        )}
      </div>
    );
  }

  const tabConfig = {
    "Actual document": <RenderPdf />,
    "Summary": <DetailedSummary />,
    "All Docs": <DocsList />
  }

  const tabStyle = {
    marginTop: '5px',
    marginLeft: '5px'
  }

  const ChatAndTabJsx = (
    <SimpleGrid height='80vh' columns={{ sm: 1, md: 2 }} spacing={2}>
      <Box borderWidth='1px' borderRadius='lg'>
        <div style={tabStyle} >
          <TabComponent tabConfig={tabConfig} />
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
