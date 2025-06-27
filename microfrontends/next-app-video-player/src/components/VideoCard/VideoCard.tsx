import { Card, Avatar, Typography, Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { VideoModel } from "@/types/video";
import { Video } from "@/@types/video";

const { Title, Text } = Typography;

interface VideoCardProps {
  video: VideoModel | Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const publishedDate = typeof video.published_at === 'string' ? new Date(video.published_at) : video.published_at;
  const videoSlug = (video as VideoModel).slug || (video as Video).id;
  
  return (
    <Link href={`/${videoSlug}`}>
      <Badge.Ribbon text="Trending" color="red">
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
                    publishedDate
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
