import { Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

export default function BrandPanel() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(88, 28, 135, 0.8), rgba(30, 64, 175, 0.8))",
          zIndex: 10,
        }}
      ></div>
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 48,
          color: "#fff",
        }}
      >
        <Title style={{ color: "#fff", fontSize: 48, marginBottom: 16 }}>
          KoziFlix
        </Title>
        <Paragraph
          style={{
            color: "#fff",
            fontSize: 24,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Your ultimate streaming destination
        </Paragraph>
        <Row gutter={[16, 16]} style={{ maxWidth: 500, width: "100%" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col span={8} key={i}>
              <div
                style={{
                  aspectRatio: "16/9",
                  borderRadius: 8,
                  overflow: "hidden",
                  background:
                    "linear-gradient(to bottom right, #8b5cf6, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  Preview {i}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
