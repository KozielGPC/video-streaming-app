import { ConfigProvider, theme } from 'antd';
import LiveStreamPage from "./pages/LiveStreamPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorBgContainer: '#001529',
          colorBgElevated: '#001529',
        },
      }}
    >
      <LiveStreamPage />
    </ConfigProvider>
  )
}

export default App;
