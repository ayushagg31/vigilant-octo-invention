"use client";
import React, { useState } from "react";
import YourDocs from "../../components/home/YourDocs";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BeforeUpload } from "../../components/home/BeforeUpload";
import { Testimonials } from "../../components/home/Testimonials";

const FileUploader = () => {
  return (
    <Box w="100%">
      <SimpleGrid columns={{ lg: 2, md: 1 }} h="100%">
        <BeforeUpload />
        <Box overflow="auto">
          <Testimonials />
          <Testimonials />
          <Testimonials />
          <Testimonials />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default FileUploader;

FileUploader.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
