"use client";
import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BeforeUpload } from "../../components/home/BeforeUpload";
import TawkMessenger from "../../components/home/TawkMessenger";
import Head from "next/head";

const FileUploader = () => {
  useEffect(() => {
    if (window?.Tawk_API && window?.Tawk_API?.showWidget) {
      window?.Tawk_API?.showWidget();
    }
    return () => {
      if (window?.Tawk_API && window?.Tawk_API?.hideWidget) {
        window?.Tawk_API?.minimize();
        window?.Tawk_API?.hideWidget();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | YourPDF.chat</title>
      </Head>
      <Box w="100%">
        <Flex w="100%" h="100%" justifyContent="center" pt="36">
          <BeforeUpload />
        </Flex>
      </Box>
      <div>
        <TawkMessenger />
      </div>
    </>
  );
};

export default FileUploader;

FileUploader.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
