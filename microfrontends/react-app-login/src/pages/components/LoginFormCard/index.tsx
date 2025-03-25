import {
  AppleOutlined,
  FacebookOutlined,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";

const { Text, Title } = Typography;

export const LoginFormCard = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      console.log("Login values:", values);
      // messageApi.success("Login successful!");
      setLoading(false);
    }, 1500);
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        borderRadius: 16,
      }}
      // bordered={false}
      variant="outlined"
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 8 }}>
          Welcome Back
        </Title>
        <Text type="secondary">Sign in to continue to KoziFlix</Text>
      </div>

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your username or email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username or Email"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
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
              // background: "linear-gradient(to right, #4f46e5, #7c3aed)",
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
            Don't have an account? <Link href="/signup">Sign up</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
};
