import { Suspense } from "react";
import { Row, Col, Layout } from "antd";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { VideosList } from "@/components/VideosList";
import { Navbar } from "@/components/NavBar/NavBar";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        <Navbar />
        <Row gutter={[16, 16]}>
          <Suspense
            fallback={new Array(15).fill(null).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <VideoCardSkeleton />
              </Col>
            ))}
          >
            <VideosList search={""} />
          </Suspense>
        </Row>
      </Content>
    </Layout>
  );
}
