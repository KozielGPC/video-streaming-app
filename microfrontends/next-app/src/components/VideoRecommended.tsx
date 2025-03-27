import { VideoModel } from "@/pages/types/video";
import Link from "next/link";
import { getMockedVideos } from "@/utils";
import { List, Empty } from "antd";
import VideoCard from "./VideoCard/VideoCard";

export function getVideosRecommended(videoId: number): VideoModel[] {
  return getMockedVideos();
}

export type VideoRecommendListProps = {
  videoId: number;
};

export async function VideosRecommendList(props: VideoRecommendListProps) {
  const { videoId } = props;
  const videos = getVideosRecommended(videoId);

  return videos.length ? (
    <List
      itemLayout="horizontal"
      dataSource={videos}
      renderItem={(video) => (
        <List.Item>
          <Link key={video.id} href={`/${video.slug}`}>
            <VideoCard
            // title={video.title}
            // thumbnail={video.thumbnail}
            // views={video.views}
            // orientation="horizontal"
            />
          </Link>
        </List.Item>
      )}
    />
  ) : (
    <Empty description="Nenhum vídeo encontrado." style={{ marginTop: 20 }} />
  );
}
