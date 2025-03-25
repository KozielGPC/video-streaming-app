import { ConfigProvider, theme } from "antd";
import { appTheme } from "../styles/theme";
import LoginPage from "./page";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: appTheme.token,
        components: {
          Button: {
            colorPrimaryHover: "#4338ca",
            colorPrimaryActive: "#3730a3",
          },
          Input: {
            colorBgContainer: "#1f2937",
            colorBorder: "#374151",
          },
          Card: {
            colorBgContainer: "#111827",
          },
          Checkbox: {
            colorPrimary: "#4f46e5",
          },
          Divider: {
            colorSplit: "#374151",
            colorTextDescription: "rgba(255, 255, 255, 0.45)",
          },
        },
      }}
    >
      <LoginPage />
    </ConfigProvider>
  );
}
