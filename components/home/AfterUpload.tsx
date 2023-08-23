import React, { useState, useEffect } from "react";
import { useDashboard } from "../../store/useDashboard";
import Chat from "./Chat";
import { TabComponent } from "../common/TabComponent";
import { PDFObject, ViewMode } from 'react-pdfobject'
import { SimpleGrid, Box, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import ChatWidget from "./ChatWidget";
import styles from "../../styles/Home.module.css";

export const AfterUpload = () => {

  const router = useRouter()
  const {
    query: { id },
  } = router

  // ssr-friendly media query with fallback
  const [isMaxWidth600] = useMediaQuery('(max-width: 600px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })



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

  const tabConfig = {
    "Actual document": <RenderPdf />,
    "Summary": <DetailedSummary />,
  }

  const tabStyle = {
    marginTop: '5px',
    marginLeft: '5px'
  }
  return (
    <SimpleGrid height='80vh' columns={{ sm: 1, md: 2 }} spacing={2}>
      <Box borderWidth='1px' borderRadius='lg'>
        <div style={tabStyle} >
          <TabComponent tabConfig={tabConfig} />
        </div>
      </Box>
      <Box height={'75vh'}>
        <ChatWidget />
      </Box>
    </SimpleGrid>
  );
};
