import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Suspense } from "react";
import { Card, Typography, Layout, Row, Col, Skeleton, Divider } from "antd";
import { getVideo } from "./getVideo";
import { VideoViews } from "./components/VideoViews";
import { VideoLikeCounter } from "./components/VideoLike";
import { VideoPlayer } from "@/components/VideoPlayer";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { VideoComments } from "./components/CommentsSession";
import { VideoRecommendations } from "./components/RecommendationSession";

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export default function VideoPlayPage() {
  const video = getVideo("asdas");

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card
              cover={
                // <div
                //   style={{
                //     position: "relative",
                //     height: "300px",
                //     width: "300px",
                //   }}
                // >
                  <VideoPlayer url={video.video_url} poster={video.thumbnail} />
                // </div>
              }
              variant="outlined"
            >
              <Title level={2}>{video.title}</Title>
              <Row justify="space-between" align="middle">
                <Suspense fallback={<Skeleton.Button active size="large" />}>
                  <VideoViews videoId={video.id} />
                  <Text type="secondary">
                    há{" "}
                    {formatDistance(video.published_at, new Date(), {
                      locale: ptBR,
                    })}
                  </Text>
                </Suspense>
                <Suspense fallback={<Skeleton.Button active size="small" />}>
                  <VideoLikeCounter videoId={video.id} />
                </Suspense>
              </Row>
              <Divider />
              <Paragraph>{video.description}</Paragraph>
            </Card>
            <VideoComments />
          </Col>

          <Col xs={24} md={8}>
            <Title level={3}>Vídeos Recomendados</Title>
            <Suspense
              fallback={new Array(10).fill(0).map((_, i) => (
                <VideoCardSkeleton orientation="horizontal" key={i} />
              ))}
            >
              <VideoRecommendations />
            </Suspense>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
