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
    <>
      <Nav />
      <div className="main-landing">
        <Hero />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
