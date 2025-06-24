import { Card, Avatar, Typography } from 'antd';

const { Title, Text } = Typography;

const StreamerInfo = () => {
  return (
    <Card 
      style={{ 
        background: '#001529',
        border: '1px solid #303030'
      }}
      bodyStyle={{ 
        padding: '16px',
        background: '#001529'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar size={48} src="https://github.com/shadcn.png">
          JD
        </Avatar>
        <div>
          <Title level={4} style={{ color: '#1890ff', margin: 0 }}>
            John Doe
          </Title>
          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
            JohnDoe's Awesome Stream
          </Text>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Text style={{ color: '#fff', fontSize: '14px' }}>
          Welcome to my channel! I stream every day at 8 PM EST. Don't forget to follow and subscribe!
        </Text>
      </div>
    </Card>
  );
};

export default StreamerInfo; 