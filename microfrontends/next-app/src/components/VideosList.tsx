import { VideoModel } from "@/pages/types/video";
import { VideoCard } from "./VideoCard";
import Link from "next/link";
import { getMockedVideos } from "@/utils";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getVideos(search: string): Promise<VideoModel[]> {
  // await sleep(2000);
  //   const url = search
  //     ? `${process.env.DJANGO_API_URL}/videos?q=${search}`
  //     : `${process.env.DJANGO_API_URL}/videos`;
  //   const response = await fetch(url, {
  //     cache: "no-cache",
  //   });
  //   return response.json();\
  return getMockedVideos();
}

export type VideoListProps = {
  search: string;
};

export async function VideosList(props: VideoListProps) {
  const { search } = props;
  const videos = await getVideos(search);
  return videos.length ? (
    videos.map((video) => (
      <div>
        <Link key={video.id} href={`/${video.slug}/play`}>
          <VideoCard
            title={video.title}
            thumbnail={video.thumbnail}
            views={video.views}
          />
        </Link>
      </div>
    ))
  ) : (
    <div className="flex items-center justify-center w-full col-span-full">
      <p className="text-gray-600 text-xl font-semibold">
        Nenhum vídeo encontrado.
      </p>
    </div>
  );
}
