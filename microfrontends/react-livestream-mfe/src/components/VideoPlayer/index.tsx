import { Card, Badge, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const VideoPlayer = () => {
  const isLive = true; // In a real app, this would come from props or state

  return (
    <Card 
      title="Live Stream" 
      style={{ 
        background: '#001529',
        border: '1px solid #303030'
      }}
      headStyle={{ color: '#fff', borderBottom: '1px solid #303030' }}
      bodyStyle={{ 
        position: 'relative',
        padding: '16px',
        background: '#001529'
      }}
    >
      <video controls width="100%" style={{ borderRadius: '8px' }}>
        {/* In a real app, the source would be dynamic */}
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      
      {/* Live indicator - top right */}
      <div style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        backdropFilter: 'blur(4px)'
      }}>
        <Badge 
          status={isLive ? "processing" : "default"} 
          color={isLive ? "red" : "gray"}
        />
        <Text style={{ color: 'white', fontSize: '14px' }}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </Text>
      </div>

      {/* Viewer count - bottom right */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        backdropFilter: 'blur(4px)'
      }}>
        <UserOutlined style={{ fontSize: '16px' }} />
        <Text style={{ color: 'white', fontSize: '14px' }}>1,234</Text>
      </div>
    </Card>
  );
};

export default VideoPlayer; 