'use client'
import React, { useState } from "react";
import LandingLayout from "../components/layout/LandingLayout";


const LandingPage = () => {
  return (
    <>
      <div>This page has been moved to /dashboard</div>
      <div>This space will be used to create landing page</div>
    </>
  );
};

export default LandingPage;


LandingPage.getLayout = (page) => {
  return <LandingLayout>{page}</LandingLayout>;
};
