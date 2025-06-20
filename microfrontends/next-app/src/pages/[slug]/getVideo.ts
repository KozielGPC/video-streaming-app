import { VideoModel } from "@/pages/types/video";

export function getVideo(slug: string): VideoModel {
  return {
    id: 1,
    title: "Big Buck Bunny",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    thumbnail: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    slug: "big-buck-bunny",
    published_at: new Date().toISOString(),
    likes: 100,
    views: 1000,
    tags: ["cartoon", "bunny"],
    video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };
}
