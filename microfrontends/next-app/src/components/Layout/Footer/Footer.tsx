import { Layout, Typography, Space } from "antd";
import Link from "next/link";

const { Footer } = Layout;
const { Text } = Typography;

export const PageFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "24px",
        background: "#001529",
        color: "white",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="horizontal" size="middle" wrap>
          <Link href="/about" style={{ color: "white" }}>
            About
          </Link>
          <Link href="/careers" style={{ color: "white" }}>
            Careers
          </Link>
          <Link href="/blog" style={{ color: "white" }}>
            Blog
          </Link>
          <Link href="/partners" style={{ color: "white" }}>
            Partners
          </Link>
          <Link href="/developers" style={{ color: "white" }}>
            Developers
          </Link>
        </Space>
        <Space direction="horizontal" size="middle" wrap>
          <Link href="/terms" style={{ color: "white" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: "white" }}>
            Privacy
          </Link>
          <Link href="/help" style={{ color: "white" }}>
            Help
          </Link>
        </Space>
        <Text style={{ color: "white" }}>
          © 2024 KoziApp. All rights reserved.
        </Text>
      </Space>
    </Footer>
  );
};
