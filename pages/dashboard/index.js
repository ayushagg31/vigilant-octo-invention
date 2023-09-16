"use client";
import React, { useState } from "react";
import YourDocs from "../../components/home/YourDocs";
import { Box, Center, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BeforeUpload } from "../../components/home/BeforeUpload";
import { StatsContainer } from "../../components/home/StatsContainer";

const FileUploader = () => {
  return (
    <Box w="100%">
      <SimpleGrid columns={{ lg: 2, md: 1 }} h="100%">
        <BeforeUpload />
        <Box overflow="auto" marginTop={'1.5rem'} marginLeft={'1rem'} marginRight={'1rem'}>
          <Center>
            <Text fontSize='3xl'>Your App Usage</Text>
          </Center>
          <Box marginTop={'.25rem'} >
            <StatsContainer />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default FileUploader;

FileUploader.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
