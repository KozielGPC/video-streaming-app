import { VideoModel } from "@/pages/types/video";
import { getMockedVideos } from "@/utils";

export function getVideo(slug: string): VideoModel {
  //   const response = await fetch(`${process.env.DJANGO_API_URL}/videos/${slug}`, {
  //     //cache: "no-cache",
  //     next: {
  //     //     revalidate: 60 * 5
  //         tags: [`video-${slug}`]
  //     }
  //   });
  //   return response.json();
  return getMockedVideos()[0];
}
