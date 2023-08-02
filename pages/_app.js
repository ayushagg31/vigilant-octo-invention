import "../styles/globals.css";
import Script from 'next/script'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://use.fontawesome.com/releases/v5.3.1/js/all.js" />
    </>
  );
}
