"use client";
import React from "react";
import { Box, Flex, Tooltip, Link } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BeforeUpload } from "../../components/home/BeforeUpload";
import { MdContactSupport } from "react-icons/md";
import style from "../../styles/NavBar.module.css";

const FileUploader = () => {
  return (
    <>
      <Box w="100%">
        <Flex w="100%" h="100%" justifyContent="center" pt="36">
          <BeforeUpload />
        </Flex>
      </Box>
      <Link href="mailto:support@docxpert.com" className={style.hoverLink}>
        <Box position="fixed" bottom="20px" right={"16px"} zIndex={1}>
          <Tooltip label="Support" placement="right" shouldWrapChildren>
            <MdContactSupport fontSize={32} />
          </Tooltip>
        </Box>
      </Link>
    </>
  );
};

export default FileUploader;

FileUploader.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
