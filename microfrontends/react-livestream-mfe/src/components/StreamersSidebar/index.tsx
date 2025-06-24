import { Drawer, Card, Avatar, Typography, Button, Badge, Divider, Space } from 'antd';
import { UserOutlined, HeartOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface Streamer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  viewers: number;
  category: string;
  isLive: boolean;
}

const mockRecommendedStreamers: Streamer[] = [
  {
    id: '1',
    name: 'GamerPro123',
    avatar: 'https://github.com/shadcn.png',
    title: 'Epic Gaming Session - New Game Release!',
    viewers: 2847,
    category: 'Gaming',
    isLive: true,
  },
  {
    id: '2',
    name: 'TechGuru',
    avatar: 'https://github.com/shadcn.png',
    title: 'Building a React App Live',
    viewers: 1205,
    category: 'Programming',
    isLive: true,
  },
  {
    id: '3',
    name: 'MusicMaker',
    avatar: 'https://github.com/shadcn.png',
    title: 'Creating Beats and Chill',
    viewers: 892,
    category: 'Music',
    isLive: true,
  },
];

const mockFollowedStreamers: Streamer[] = [
  {
    id: '4',
    name: 'BestFriend',
    avatar: 'https://github.com/shadcn.png',
    title: 'Just Chatting and Gaming',
    viewers: 156,
    category: 'Just Chatting',
    isLive: true,
  },
  {
    id: '5',
    name: 'FavoriteStreamer',
    avatar: 'https://github.com/shadcn.png',
    title: 'Speedrun Attempts All Day',
    viewers: 3421,
    category: 'Gaming',
    isLive: true,
  },
];

interface StreamerCardProps {
  streamer: Streamer;
  onClick: (streamer: Streamer) => void;
}

const StreamerCard = ({ streamer, onClick }: StreamerCardProps) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(streamer)}
      style={{
        marginBottom: 12,
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
      }}
      bodyStyle={{ padding: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <Avatar size={40} src={streamer.avatar}>
            {streamer.name.charAt(0)}
          </Avatar>
          {streamer.isLive && (
            <Badge
              status="processing"
              color="red"
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
              }}
            />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text strong style={{ color: '#fff', fontSize: 14, display: 'block' }}>
            {streamer.name}
          </Text>
          <Text
            style={{
              color: '#8c8c8c',
              fontSize: 12,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {streamer.title}
          </Text>
          <Space size={8} style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined style={{ color: '#8c8c8c', fontSize: 10 }} />
              <Text style={{ color: '#8c8c8c', fontSize: 10 }}>
                {streamer.viewers.toLocaleString()}
              </Text>
            </div>
            <Text style={{ color: '#8c8c8c', fontSize: 10 }}>
              {streamer.category}
            </Text>
          </Space>
        </div>
      </div>
    </Card>
  );
};

interface StreamersSidebarProps {
  open: boolean;
  onClose: () => void;
}

const StreamersSidebar = ({ open, onClose }: StreamersSidebarProps) => {
  const handleStreamerClick = (streamer: Streamer) => {
    console.log('Navigate to streamer:', streamer.name);
    // In a real app, this would navigate to the streamer's page
  };

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ color: '#1890ff' }} />
          <Text strong style={{ color: '#fff' }}>
            Live Streamers
          </Text>
        </div>
      }
      placement="left"
      onClose={onClose}
      open={open}
      width={320}
      style={{
        background: '#000',
      }}
      headerStyle={{
        background: '#001529',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      bodyStyle={{
        background: '#000',
        padding: 16,
      }}
    >
      {/* Recommended Streamers Section */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <StarOutlined style={{ color: '#1890ff' }} />
          <Title level={5} style={{ color: '#fff', margin: 0 }}>
            Recommended
          </Title>
        </div>
        {mockRecommendedStreamers.map((streamer) => (
          <StreamerCard
            key={streamer.id}
            streamer={streamer}
            onClick={handleStreamerClick}
          />
        ))}
      </div>

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Following Streamers Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <HeartOutlined style={{ color: '#ff4d4f' }} />
          <Title level={5} style={{ color: '#fff', margin: 0 }}>
            Following
          </Title>
        </div>
        {mockFollowedStreamers.map((streamer) => (
          <StreamerCard
            key={streamer.id}
            streamer={streamer}
            onClick={handleStreamerClick}
          />
        ))}
      </div>

      {/* View All Button */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Button type="primary" block>
          View All Streamers
        </Button>
      </div>
    </Drawer>
  );
};

export default StreamersSidebar; 