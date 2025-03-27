import { Layout } from "@/components/Layout/Layout";
import "@/globals.css";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
