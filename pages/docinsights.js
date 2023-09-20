"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@chakra-ui/react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AfterUpload from "../components/home/AfterUpload";

const DocInsights = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);
  return router.isReady && <AfterUpload />;
};

DocInsights.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DocInsights;
