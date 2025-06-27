import { Video } from "@/@types/video";

export const videos: Video[] = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnail: "/thumbnail.png",
    description:
      "A digitally restored version of the classic Blender Foundation movie, Big Buck Bunny.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    published_at: new Date("2023-10-26T14:00:00Z"),
    views: 1500000,
    likes: 78000,
    trending: true,
    slug: "big-buck-bunny",
    tags: ["animation", "blender", "classic"],
    channel: {
      name: "Blender Foundation",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "2",
    title: "Elephants Dream",
    thumbnail: "/thumbnail.png",
    description: "The first open movie by the Blender Foundation.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    published_at: new Date("2023-09-15T10:30:00Z"),
    views: 800000,
    likes: 45000,
    slug: "elephants-dream",
    tags: ["animation", "blender", "movie"],
    channel: {
      name: "Blender Foundation",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    thumbnail: "/thumbnail.png",
    description: "A fun, short animation about a dragon.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    published_at: new Date("2024-01-05T18:00:00Z"),
    views: 250000,
    likes: 12000,
    trending: true,
    slug: "for-bigger-blazes",
    tags: ["animation", "dragon", "fun"],
    channel: {
      name: "Animation Masters",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "4",
    title: "For Bigger Escape",
    thumbnail: "/thumbnail.png",
    description: "A thrilling escape sequence.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    published_at: new Date("2024-02-20T12:00:00Z"),
    views: 500000,
    likes: 25000,
    slug: "for-bigger-escape",
    tags: ["action", "thriller", "escape"],
    channel: {
      name: "Action Flicks",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "5",
    title: "For Bigger Fun",
    thumbnail: "/thumbnail.png",
    description: "A lighthearted and fun animation.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    published_at: new Date("2024-03-10T09:00:00Z"),
    views: 150000,
    likes: 8000,
    slug: "for-bigger-fun",
    tags: ["comedy", "fun", "animation"],
    channel: {
      name: "Comedy Central",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "6",
    title: "For Bigger Joyrides",
    thumbnail: "/thumbnail.png",
    description: "An adventurous joyride.",
    video_url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    published_at: new Date("2024-04-01T16:00:00Z"),
    views: 350000,
    likes: 18000,
    trending: true,
    slug: "for-bigger-joyrides",
    tags: ["adventure", "fun", "joyride"],
    channel: {
      name: "Adventure Vlogs",
      avatar: "https://yt3.ggpht.com/a/AATXAJyv_V4p_q0Z_u_Z_Z_Z_Z_Z_Z_Z_Z_Z_Z_Y=s88-c-k-c0x00ffffff-no-rj",
    },
  },
]; 