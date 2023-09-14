"use client";
import React, { useState } from "react";
import YourDocs from "../../components/home/YourDocs";
import {
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Tooltip,
  Container,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BeforeUpload } from "../../components/home/BeforeUpload";
import { Testimonials } from "../../components/home/Testimonials";

const FileUploader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom={"1px"} borderColor="blackAlpha.100">
            Your Documents
          </DrawerHeader>

          <DrawerBody p={3}>
            <YourDocs />
          </DrawerBody>

          <DrawerFooter shadow={"inner"}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default FileUploader;

FileUploader.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
