import { Button, Typography } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: '#001529',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onToggleSidebar}
          style={{
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
          size="large"
        />
        <Title level={4} style={{ color: '#fff', margin: 0 }}>
          StreamHub
        </Title>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button
          type="text"
          icon={<UserOutlined />}
          style={{
            color: '#fff',
            border: 'none',
            background: 'transparent',
          }}
        >
          Profile
        </Button>
      </div>
    </div>
  );
};

export default Header; 