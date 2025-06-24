import { Card, Input, Button, Avatar, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ChatMessage = ({ user, message, avatar }: { user: string, message: string, avatar: string }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Avatar size={32} src={avatar}>
                {user.charAt(0)}
            </Avatar>
            <div>
                <Text strong style={{ color: '#1890ff' }}>{user}</Text>
                <Text style={{ marginLeft: '8px', color: '#fff' }}>: {message}</Text>
            </div>
        </div>
    )
}

const ChatInput = () => {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Input 
                placeholder="Type a message..." 
                style={{ flex: 1 }}
                variant="filled"
            />
            <Button type="primary" icon={<SendOutlined />}>
                Send
            </Button>
        </div>
    )
}

const Chat = () => {
  return (
    <Card 
      title="Live Chat" 
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#001529',
        border: '1px solid #303030'
      }}
      headStyle={{ color: '#fff', borderBottom: '1px solid #303030' }}
      bodyStyle={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px',
        background: '#001529'
      }}
    >
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        marginBottom: '16px',
        paddingRight: '8px'
      }}>
        <ChatMessage user="Alice" message="This is awesome!" avatar="https://github.com/shadcn.png" />
        <ChatMessage user="Bob" message="I agree!" avatar="https://github.com/shadcn.png" />
        <ChatMessage user="Charlie" message="Can't wait for the next stream!" avatar="https://github.com/shadcn.png" />
        <ChatMessage user="Alice" message="This is awesome!" avatar="https://github.com/shadcn.png" />
        <ChatMessage user="Bob" message="I agree!" avatar="https://github.com/shadcn.png" />
        <ChatMessage user="Charlie" message="Can't wait for the next stream!" avatar="https://github.com/shadcn.png" />
      </div>
      <ChatInput />
    </Card>
  );
};

export default Chat; 