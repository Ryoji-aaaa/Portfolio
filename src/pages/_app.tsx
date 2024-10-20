import "../styles/globals.css";
import type { AppProps } from "next/app";
// import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const loadingElements = document.querySelectorAll(
        ".index-loading, .index-loadings"
      );
      loadingElements.forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="index-loading">Loading</div>
      <p className="index-loadings">
        Loadingの表示のままの場合
        <br />
        Google Chrome{" "}
        <a target="_blank" href="https://www.google.com/intl/ja_jp/chrome/">
          最新版
        </a>
        をご利用ください。
      </p>
      <main>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
}

export default MyApp;
