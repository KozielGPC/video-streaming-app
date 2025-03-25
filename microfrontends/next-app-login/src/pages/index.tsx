"use client";

import { useState } from "react";
import { Typography, message, Row, Col } from "antd";
import Image from "next/image";
import { LoginFormCard } from "./components/LoginFormCard";
import RootLayout from "@/layout";

const { Title, Text, Paragraph } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      console.log("Login values:", values);
      messageApi.success("Login successful!");
      setLoading(false);
    }, 1500);
  };

  return (
    <RootLayout>
      <Row style={{ minHeight: "100vh" }}>
        {contextHolder}

        {/* Left side - Video/streaming imagery */}
        <Col
          xs={0}
          md={12}
          style={{
            background: "#000",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(88, 28, 135, 0.8), rgba(30, 64, 175, 0.8))",
              zIndex: 10,
            }}
          ></div>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              // src="/placeholdersvg?height=1080&width=1920"
              src={"https://placehold.co/1920x1080/svg"}
              alt="Streaming background"
              fill
              style={{ objectFit: "cover", opacity: 0.7 }}
              priority
            />
          </div>
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
        </Col>

        {/* Right side - Login form */}
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
    </RootLayout>
  );
}
