import { Suspense } from "react";
import { Row, Col, Typography } from "antd";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { videos } from "@/mocks/videos";
import VideoSection from "@/components/VideoSection/VideoSection";

const { Title } = Typography;

export default function Home() {
  const trendingVideos = videos.filter((v) => v.trending);
  const newVideos = [...videos]
    .sort((a, b) => b.published_at.getTime() - a.published_at.getTime())
    .slice(0, 4);
  const recommendedVideos = videos.filter((v) => !v.trending);

  return (
    <div style={{ padding: "24px" }}>
      <Suspense
        fallback={
          <>
            <Title level={2} style={{ marginBottom: "24px" }}>
              Loading...
            </Title>
            <Row gutter={[16, 24]}>
              {new Array(8).fill(null).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <VideoCardSkeleton />
                </Col>
              ))}
            </Row>
          </>
        }
      >
        <VideoSection title="Trending" videos={trendingVideos} />
        <VideoSection title="New Releases" videos={newVideos} />
        <VideoSection title="Recommended" videos={recommendedVideos} />
      </Suspense>
    </div>
  );
}
