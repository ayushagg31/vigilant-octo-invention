"use client";
import React, { useState } from "react";
import LandingLayout from "../components/layout/LandingLayout";
import Nav from "../components/landing/Nav";
import Hero from "../components/landingComponents/LandingHero";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import Footer from "../components/landingComponents/Footer"

const LandingPage = () => {
  return (
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
