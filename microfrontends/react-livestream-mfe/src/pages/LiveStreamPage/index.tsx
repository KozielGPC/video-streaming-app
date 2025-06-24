import { useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Chat from '../../components/Chat';
import StreamerInfo from '../../components/StreamerInfo';
import Header from '../../components/Header';
import StreamersSidebar from '../../components/StreamersSidebar';
import { Layout } from 'antd';

const { Content, Sider, Header: AntHeader } = Layout;

const LiveStreamPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#000' }}>
      <AntHeader style={{ padding: 0, background: '#001529', height: 'auto' }}>
        <Header onToggleSidebar={toggleSidebar} />
      </AntHeader>
      
      <Layout>
        <Content style={{ padding: '16px', background: 'transparent' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <VideoPlayer />
            </div>
            <StreamerInfo />
          </div>
        </Content>
        
        <Sider width={350} style={{ background: '#000', padding: '16px' }}>
          <Chat />
        </Sider>
      </Layout>

      <StreamersSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </Layout>
  );
};

export default LiveStreamPage; 