import { Layout, Input, Button, Space } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

export const CustomHeader = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: "#001529",
        padding: "0 24px",
      }}
    >
      <Space
        size="large"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Space size="middle">
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white" }} />}
          />
          <Link
            href="/"
            style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}
          >
            KoziApp
          </Link>
        </Space>
        <Input
          prefix={
            <SearchOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
          }
          placeholder="Search videos, channels, or categories..."
          style={{ width: "300px" }}
        />
        <Space size="middle">
          <Button
            type="text"
            icon={<BellOutlined style={{ color: "white" }} />}
          />
          <Button type="default" icon={<UserOutlined />}>
            Sign In
          </Button>
        </Space>
      </Space>
    </Header>
  );
};
