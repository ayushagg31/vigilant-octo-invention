"use client";
import React, { useState } from "react";
import LandingLayout from "../components/layout/LandingLayout";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div>
        This page has been moved to /dashboard
        <Link href={"/dashboard"}> Click here to redirect</Link>
      </div>
      <div>This space will be used to create landing page</div>
    </>
  );
};

export default LandingPage;

LandingPage.getLayout = (page) => {
  return <LandingLayout>{page}</LandingLayout>;
};
