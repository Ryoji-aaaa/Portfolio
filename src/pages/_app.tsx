import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <div className="index-loading">Loading</div>
        <p>
          Loadingの表示のままの場合
          <br />
          Google Chrome{" "}
          <a target="_blank" href="https://www.google.com/intl/ja_jp/chrome/">
            最新版
          </a>
          をご利用ください。
        </p>
        <style jsx>{`
          div {
            display: none;
          }
        `}</style>
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
