import "../styles/globals.css";
import Script from "next/script";
'use client'
import NavBar from "../components/layout/NavBar";
import RootModal from "../components/layout/modals/RootModal";
import { Providers } from "./_provider";
import APIErrorNotificationProvider from "../customProviders/apiNotificationProvider";
import APIErrorProvider from "../customProviders/apiErrorProvider";
import APILoaderProvider from "../customProviders/apiLoaderProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <APIErrorProvider>
          <APILoaderProvider>
            <NavBar />
            <Component {...pageProps} />
            <RootModal />
            <APIErrorNotificationProvider />
          </APILoaderProvider>
        </APIErrorProvider>
        <Script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
      </Providers>
    </>
  );
}
