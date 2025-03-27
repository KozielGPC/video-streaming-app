import { Card, Typography, Badge, Flex } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

interface VideoCardProps {
  trending?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ trending }) => {
  return (
    <Badge.Ribbon text={trending ? "Trending" : ""} color="red">
      <Card
        hoverable
        cover={
          <div style={{ position: "relative", width: "100%", height: "170px" }}>
            <Image
              alt="video thumbnail"
              src="/thumbnail.png"
              objectFit="cover"
              layout="fill"
            />
          </div>
        }
      >
        <Title level={5}>Making the Perfect Cup of Coffee</Title>
        <Text type="secondary">Super Cool Channel</Text>
        <Flex justify="space-between">
          <Text>12321 Views</Text>
          <Text>1231121 Likes</Text>
        </Flex>
      </Card>
    </Badge.Ribbon>
  );
};

export default VideoCard;
