import "../styles/globals.css";
import Script from "next/script";
("use client");
import Head from "next/head";
import Providers from "./_provider";
import APIErrorNotificationProvider from "../customProviders/apiNotificationProvider";
import APIErrorProvider from "../customProviders/apiErrorProvider";
import APILoaderProvider from "../customProviders/apiLoaderProvider";
import { useEffect } from "react";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { app } from "../config/googleAuth.config";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.remove();
    }
    if (isSupported()) {
      const analytics = getAnalytics(app);
      logEvent(analytics, 'page_view');
    }
  }, []);
  return (
    <>
      <Head>
        <title>YourPDF.chat | Experience PDFs like Never Before!</title>
      </Head>
      <Providers>
        <APIErrorProvider>
          <APILoaderProvider>
            {getLayout(
              <>
                <Component {...pageProps} />
              </>
            )}
            <APIErrorNotificationProvider />
          </APILoaderProvider>
        </APIErrorProvider>
        <Script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-H4515X7ECK"
        />
        */}
        {/* <Script strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-H4515X7ECK');`}
        </Script> */}
      </Providers>
    </>
  );
}
