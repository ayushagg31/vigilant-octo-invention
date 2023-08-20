import "../styles/globals.css";
import Script from "next/script";
'use client'
import ResponsiveAppBar from "../components/layout/Header";
import RootModal from "../components/layout/modals/RootModal";
import { Providers } from "./_provider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <ResponsiveAppBar />
        <Component {...pageProps} />
        <RootModal />
        <Script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
      </Providers>
    </>
  );
}
