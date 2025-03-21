"use client"

import { useState } from "react"
import { Button, Checkbox, Form, Input, Divider, Typography, message, Row, Col, Card } from "antd"
import { UserOutlined, LockOutlined, GoogleOutlined, AppleOutlined, FacebookOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"

const { Title, Text, Paragraph } = Typography

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values: any) => {
    setLoading(true)
    // Simulate login
    setTimeout(() => {
      console.log("Login values:", values)
      messageApi.success("Login successful!")
      setLoading(false)
    }, 1500)
  }

  return (
    <Row style={{ minHeight: "100vh" }}>
      {contextHolder}

      {/* Left side - Video/streaming imagery */}
      <Col xs={0} md={12} style={{ background: "#000", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(88, 28, 135, 0.8), rgba(30, 64, 175, 0.8))",
            zIndex: 10,
          }}
        ></div>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
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
          <Title style={{ color: "#fff", fontSize: 48, marginBottom: 16 }}>KoziFlix</Title>
          <Paragraph style={{ color: "#fff", fontSize: 24, marginBottom: 32, textAlign: "center" }}>
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
                    background: "linear-gradient(to bottom right, #8b5cf6, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)" }}>Preview {i}</span>
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
        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            borderRadius: 16,
          }}
          bordered={false}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome Back
            </Title>
            <Text type="secondary">Sign in to continue to KoziFlix</Text>
          </div>

          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" size="large">
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username or email!" }]}>
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username or Email"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Password"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item>
              <Row justify="space-between" align="middle">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="/forgot-password" style={{ color: "#4f46e5" }}>
                  Forgot password?
                </Link>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: 48,
                  background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                  borderRadius: 8,
                }}
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>

            <Divider plain>or continue with</Divider>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Button
                  icon={<GoogleOutlined />}
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col span={8}>
                <Button
                  icon={<FacebookOutlined />}
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col span={8}>
                <Button
                  icon={<AppleOutlined />}
                  style={{
                    width: "100%",
                    height: 48,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Col>
            </Row>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link href="/signup" style={{ color: "#4f46e5" }}>
                  Sign up
                </Link>
              </Text>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

