"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../components/layout/DashboardLayout";
import DocChatViewer from "../components/home/DocChatViewer";

const DocInsights = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);
  return router.isReady && <DocChatViewer />;
};

DocInsights.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DocInsights;
