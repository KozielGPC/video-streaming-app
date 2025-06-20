import { Card, Avatar, Typography, Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Video } from "@/@types/video";

const { Title, Text } = Typography;

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link href={`/${video.id}`}>
      <Badge.Ribbon text={video.trending ? "Trending" : ""} color="red">
        <Card
          hoverable
          cover={
            <Image
              alt={video.title}
              src={video.thumbnail}
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
            />
          }
        >
          <Card.Meta
            avatar={<Avatar src={video.channel.avatar} />}
            title={
              <Title level={5} ellipsis={{ rows: 2 }}>
                {video.title}
              </Title>
            }
            description={
              <>
                <Text type="secondary">{video.channel.name}</Text>
                <br />
                <Text type="secondary">
                  {`${video.views} views • ${formatDistanceToNow(
                    video.published_at
                  )} ago`}
                </Text>
              </>
            }
          />
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};

export default VideoCard;
