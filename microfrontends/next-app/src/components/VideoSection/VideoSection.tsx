import { Row, Col, Typography } from "antd";
import VideoCard from "@/components/VideoCard/VideoCard";
import { Video } from "@/@types/video";

const { Title } = Typography;

interface VideoSectionProps {
  title: string;
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ title, videos }) => {
  return (
    <div style={{ marginBottom: "48px" }}>
      <Title level={3} style={{ marginBottom: "24px" }}>
        {title}
      </Title>
      <Row gutter={[16, 24]}>
        {videos.map((video) => (
          <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
            <VideoCard video={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VideoSection; 