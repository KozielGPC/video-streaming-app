import { VideoModel } from "@/pages/types/video";
import { VideoCard } from "./VideoCard";
import Link from "next/link";
import { getMockedVideos } from "@/utils";

export function getVideosRecommended(videoId: number): VideoModel[] {
  //   const response = await fetch(`${process.env.DJANGO_API_URL}/videos/${videoId}/recommended`, {
  //     cache: "no-cache",
  //   });

  //   return response.json();
  return getMockedVideos();
}

export type VideoRecommendListProps = {
  videoId: number;
};

export async function VideosRecommendList(props: VideoRecommendListProps) {
  const { videoId } = props;
  const videos = await getVideosRecommended(videoId);
  return videos.length ? (
    videos.map((video) => (
      <Link key={video.id} href={`/${video.slug}/play`}>
        <VideoCard
          title={video.title}
          thumbnail={video.thumbnail}
          views={video.views}
          orientation="horizontal"
        />
      </Link>
    ))
  ) : (
    <div className="flex items-center justify-center w-full col-span-full">
      <p className="text-gray-600 text-xl font-semibold">
        Nenhum vídeo encontrado.
      </p>
    </div>
  );
}
