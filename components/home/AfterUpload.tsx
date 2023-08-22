import React, { useState } from "react";
import { useDashboard } from "../../store/useDashboard";
import Chat from "./Chat";
import { TabComponent } from "../common/TabComponent";
import { PDFObject } from 'react-pdfobject'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import ChatWidget from "./ChatWidget";

export const AfterUpload = () => {

  const router = useRouter()
  const {
    query: { id },
  } = router


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
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <TabComponent tabConfig={tabConfig} />
        </Box>
        <Box height={"70vh"}>
          <ChatWidget />
        </Box>
      </SimpleGrid>
    </div>
  );
};
