import VideoPlayer from '../../components/VideoPlayer';
import Chat from '../../components/Chat';
import StreamerInfo from '../../components/StreamerInfo';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

const LiveStreamPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#001529' }}>
      <Content style={{ padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
          <div style={{ flex: 1 }}>
            <VideoPlayer />
          </div>
          <StreamerInfo />
        </div>
      </Content>
      <Sider width={350} style={{ background: '#001529', padding: '16px' }}>
        <Chat />
      </Sider>
    </Layout>
  );
};

export default LiveStreamPage; 