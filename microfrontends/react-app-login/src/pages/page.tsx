import { message, Row, Col } from "antd";
import { LoginFormCard } from "./components/LoginFormCard";
import BrandPanel from "./components/BrandPanel";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, contextHolder] = message.useMessage();

  return (
    <Row style={{ minHeight: "100vh" }}>
      {contextHolder}

      <Col
        xs={0}
        md={12}
        style={{
          background: "#000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BrandPanel />
      </Col>

      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
        }}
      >
        <LoginFormCard />
      </Col>
    </Row>
  );
}
