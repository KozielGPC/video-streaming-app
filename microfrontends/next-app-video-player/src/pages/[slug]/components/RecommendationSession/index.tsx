import { Card, Typography, Badge } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FireOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export function VideoRecommendations() {
  return (
    <div>
      {recommendedVideos.map((video, index) => (
        <RecommendedVideoCard key={index} video={video} />
      ))}
    </div>
  );
}

interface VideoProps {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
  trending?: boolean;
}

function RecommendedVideoCard({ video }: { video: VideoProps }) {
  return (
    <Link href={`/video/${video.id}`}>
      <Card
        hoverable
        style={{ marginBottom: "16px" }}
        cover={
          <div style={{ position: "relative" }}>
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              width={320}
              height={180}
              layout="responsive"
              objectFit="cover"
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                fontSize: "12px",
                padding: "5px",
                borderRadius: "3px",
              }}
            >
              {video.duration}
            </div>
            {video.trending && (
              <Badge
                count={<FireOutlined style={{ color: "#FF4D4F" }} />}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </div>
        }
      >
        <Title level={5}>{video.title}</Title>
        <Text type="secondary">{video.channel}</Text>
        <Text type="secondary" style={{ display: "block", marginTop: "4px" }}>
          {video.views} • {video.time}
        </Text>
      </Card>
    </Link>
  );
}

const recommendedVideos: VideoProps[] = [
  {
    id: "1",
    title: "Top 10 Tips for Improving Your Game Sense",
    channel: "ProGamerTips",
    views: "450K views",
    time: "3 weeks ago",
    duration: "12:45",
    thumbnail: "/thumbnail.png",
    trending: true,
  },
  {
    id: "2",
    title: "The Ultimate Guide to Keyboard and Mouse Settings",
    channel: "TechGamer",
    views: "1.2M views",
    time: "2 months ago",
    duration: "18:32",
    thumbnail: "/thumbnail.png",
  },
  {
    id: "3",
    title: "How to Win More 1v1 Duels in FPS Games",
    channel: "AimTrainer",
    views: "890K views",
    time: "1 month ago",
    duration: "15:20",
    thumbnail: "/thumbnail.png",
  },
  {
    id: "4",
    title: "Pro Player Settings Revealed - Copy These for Instant Improvement",
    channel: "EsportsInsider",
    views: "2.1M views",
    time: "6 months ago",
    duration: "22:15",
    thumbnail: "/thumbnail.png",
  },
  {
    id: "5",
    title: "The Psychology of Winning - Mental Game Tips",
    channel: "MindsetMaster",
    views: "780K views",
    time: "2 weeks ago",
    duration: "14:50",
    thumbnail: "/thumbnail.png",
  },
  {
    id: "6",
    title: "Common Mistakes Even Good Players Make",
    channel: "GameMaster",
    views: "1.5M views",
    time: "3 months ago",
    duration: "19:45",
    thumbnail: "/thumbnail.png",
    trending: true,
  },
  {
    id: "7",
    title: "How to Practice Efficiently and Improve Faster",
    channel: "SkillBuilder",
    views: "650K views",
    time: "5 weeks ago",
    duration: "16:30",
    thumbnail: "/thumbnail.png",
  },
  {
    id: "8",
    title: "Team Communication Guide - Call Outs That Win Games",
    channel: "TeamTactics",
    views: "920K views",
    time: "1 month ago",
    duration: "20:10",
    thumbnail: "/thumbnail.png",
  },
];
