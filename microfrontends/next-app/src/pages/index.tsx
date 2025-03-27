import { Suspense } from "react";
import { Row, Col } from "antd";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { VideoSession } from "./components/VideoSession";
import { getVideoSessions } from "@/mocks/video-sessions";
import { VideoTabs } from "@/pages/components/VideoTabs/VideoTabs";
import { Layout } from "@/components/Layout/Layout";

export default function Home() {
  const videoSessions = getVideoSessions();

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Suspense
          fallback={new Array(15).fill(null).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <VideoCardSkeleton />
            </Col>
          ))}
        >
          <Col>
            {videoSessions.map((session) => (
              <VideoSession key={session.id} title={session.title} />
            ))}
          </Col>
        </Suspense>
      </Row>
      <VideoTabs />
    </Layout>
  );
}
