import "../styles/globals.css";
import Script from "next/script";
("use client");
import RootModal from "../components/layout/modals/RootModal";
import Head from "next/head";
import Providers from "./_provider";
import APIErrorNotificationProvider from "../customProviders/apiNotificationProvider";
import APIErrorProvider from "../customProviders/apiErrorProvider";
import APILoaderProvider from "../customProviders/apiLoaderProvider";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
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
            <RootModal />
            <APIErrorNotificationProvider />
          </APILoaderProvider>
        </APIErrorProvider>
        <Script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
      </Providers>
    </>
  );
}
