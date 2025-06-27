import { VideoModel } from "@/types/video";
import Link from "next/link";
import { getMockedVideos } from "@/utils";
import { Row, Col, Empty } from "antd";
import VideoCard from "./VideoCard/VideoCard";

export async function getVideos(search: string): Promise<VideoModel[]> {
  return getMockedVideos();
}

export type VideoListProps = {
  search: string;
};

export async function VideosList(props: VideoListProps) {
  const { search } = props;
  const videos = await getVideos(search);
  return videos.length ? (
    <Row gutter={[16, 16]}>
      {videos.map((video) => (
        <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
          <Link href={`/${video.slug}`}>
            {/* <VideoCard
            // title={video.title}
            // thumbnail={video.thumbnail}
            // views={video.views}
            /> */}
          </Link>
        </Col>
      ))}
    </Row>
  ) : (
    <Empty description="Nenhum vídeo encontrado." style={{ margin: "auto" }} />
  );
}
