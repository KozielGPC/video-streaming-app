import { Avatar, Button, Typography, Space } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface CommentItemProps {
  author: string;
  avatar: string;
  time: string;
  likes: number;
  content: string;
  replies: number;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  author,
  avatar,
  time,
  likes,
  content,
  replies,
}) => {
  return (
    <Space align="start" style={{ display: "flex", width: "100%" }}>
      {/* Avatar */}
      <Avatar src={avatar} alt={author} size={40}>
        {author.substring(0, 2).toUpperCase()}
      </Avatar>

      {/* Comment Content */}
      <Space direction="vertical" style={{ flex: 1 }}>
        <Space>
          <Text strong>{author}</Text>
          <Text type="secondary">{time}</Text>
        </Space>

        <Text>{content}</Text>

        {/* Action Buttons */}
        <Space size="middle">
          <Button type="text" icon={<LikeOutlined />}>
            {likes}
          </Button>
          <Button type="text" icon={<DislikeOutlined />} />
          <Button type="text">Reply</Button>

          {replies > 0 && (
            <Button type="text" icon={<MessageOutlined />}>
              {replies} {replies === 1 ? "reply" : "replies"}
            </Button>
          )}

          <Button
            type="text"
            icon={<MoreOutlined />}
            style={{ marginLeft: "auto" }}
          />
        </Space>
      </Space>
    </Space>
  );
};
