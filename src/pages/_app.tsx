import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.includes("login")) {
    return <Component {...pageProps} />;
  } else {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-20">
          <Header />
        </div>
        <div
          className="w-full flex justify-between"
          style={{
            height: "calc(100vh - 80px)",
          }}
        >
          <div className="w-96 h-full bg-primary-color">
            <Sidebar />
          </div>
          <div
            style={{
              width: "calc(100% - 384px)",
            }}
            className="h-full px-8 py-8"
          >
            <div className="overflow-y-auto w-full h-full" id="main-content">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
