import React, { useState } from "react";
import Home from "../components/home/Home";
import ResponsiveAppBar from "../components/layout/Header";
import { Container } from "@mui/material";

const FileUploader = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </>
  );
};

export default FileUploader;
