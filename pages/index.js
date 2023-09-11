"use client";
import React, { useState } from "react";
import LandingLayout from "../components/layout/LandingLayout";
import Nav from "../components/landing/Nav";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    // <>
    //   <div>
    //     This page has been moved to /dashboard
    //     <Link href={"/dashboard"}> Click here to redirect</Link>
    //   </div>
    //   <div>This space will be used to create landing page</div>
    // </>
    <>
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
};

export default LandingPage;

LandingPage.getLayout = (page) => {
  return <LandingLayout>{page}</LandingLayout>;
};
