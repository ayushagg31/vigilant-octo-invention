import { Html, Head, Main, NextScript } from "next/document";
// import Head from "next/head";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        />
        <link
          ref="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css"
        />
        <meta
          name="description"
          content="Brings your documents and videos to life, enabling you to engage in natural and interactive conversations with them. Unlock a world of possibilities for collaboration, learning, and information retrieval like never before."
          key="desc"
        />
        <meta
          property="og:title"
          content="YourPDF.chat | Experience PDFs like Never Before!"
        />
        <meta
          property="og:description"
          content="Brings your documents and videos to life, enabling you to engage in natural and interactive conversations with them. Unlock a world of possibilities for collaboration, learning, and information retrieval like never before."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="YourPDF.chat" />
        <meta property="og:url" content="https://yourpdf.chat" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
