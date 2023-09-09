"use client";
import React, { useState } from "react";
import { Container, Box } from "@chakra-ui/react";
import { AfterUpload } from "../components/home/AfterUpload";
import DashboardLayout from "../components/layout/DashboardLayout";

const DocInsights = () => {
  return <AfterUpload />;
};

DocInsights.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DocInsights;
