import type { Video, Comment } from "@/types";

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Big Buck Bunny - The Complete Adventure",
    description:
      "Big Buck Bunny is a short computer-animated comedy film featuring a large white rabbit who is provoked by three bullying rodents. This digitally restored version brings the classic to life in stunning quality.",
    thumbnailUrl: "https://picsum.photos/seed/video1/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 596,
    views: 1500000,
    likes: 78000,
    createdAt: "2025-10-26T14:00:00Z",
    channel: {
      id: "ch1",
      name: "Blender Foundation",
      avatarUrl: "https://picsum.photos/seed/channel1/100/100",
      subscriberCount: 2500000,
    },
  },
  {
    id: "2",
    title: "Elephants Dream - A Surreal Journey",
    description:
      "The first open movie by the Blender Foundation. A surreal journey through a machine-like world with two characters exploring the boundaries of reality.",
    thumbnailUrl: "https://picsum.photos/seed/video2/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: 653,
    views: 800000,
    likes: 45000,
    createdAt: "2025-09-15T10:30:00Z",
    channel: {
      id: "ch1",
      name: "Blender Foundation",
      avatarUrl: "https://picsum.photos/seed/channel1/100/100",
      subscriberCount: 2500000,
    },
  },
  {
    id: "3",
    title: "For Bigger Blazes - Dragon Fire Animation",
    description:
      "A fun, short animation about a dragon. Watch as this magnificent creature unleashes its fiery breath in spectacular fashion.",
    thumbnailUrl: "https://picsum.photos/seed/video3/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: 15,
    views: 250000,
    likes: 12000,
    createdAt: "2026-01-05T18:00:00Z",
    channel: {
      id: "ch2",
      name: "Animation Masters",
      avatarUrl: "https://picsum.photos/seed/channel2/100/100",
      subscriberCount: 890000,
    },
  },
  {
    id: "4",
    title: "For Bigger Escapes - Action Thriller",
    description:
      "A thrilling escape sequence that will keep you on the edge of your seat. Experience pulse-pounding action in this cinematic short.",
    thumbnailUrl: "https://picsum.photos/seed/video4/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: 15,
    views: 500000,
    likes: 25000,
    createdAt: "2025-12-20T12:00:00Z",
    channel: {
      id: "ch3",
      name: "Action Flicks",
      avatarUrl: "https://picsum.photos/seed/channel3/100/100",
      subscriberCount: 1200000,
    },
  },
  {
    id: "5",
    title: "For Bigger Fun - Comedy Animation",
    description:
      "A lighthearted and fun animation that will bring a smile to your face. Perfect entertainment for all ages.",
    thumbnailUrl: "https://picsum.photos/seed/video5/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: 60,
    views: 150000,
    likes: 8000,
    createdAt: "2026-01-10T09:00:00Z",
    channel: {
      id: "ch4",
      name: "Comedy Central",
      avatarUrl: "https://picsum.photos/seed/channel4/100/100",
      subscriberCount: 3500000,
    },
  },
  {
    id: "6",
    title: "For Bigger Joyrides - Adventure Awaits",
    description:
      "An adventurous joyride through stunning landscapes. Buckle up for an unforgettable journey filled with excitement.",
    thumbnailUrl: "https://picsum.photos/seed/video6/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: 15,
    views: 350000,
    likes: 18000,
    createdAt: "2026-01-15T16:00:00Z",
    channel: {
      id: "ch5",
      name: "Adventure Vlogs",
      avatarUrl: "https://picsum.photos/seed/channel5/100/100",
      subscriberCount: 750000,
    },
  },
  {
    id: "7",
    title: "Sintel - The Durian Open Movie",
    description:
      "Sintel is a short film made by the Blender Institute. It tells the story of a young woman searching for a dragon she has befriended.",
    thumbnailUrl: "https://picsum.photos/seed/video7/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: 888,
    views: 2100000,
    likes: 125000,
    createdAt: "2025-08-01T08:00:00Z",
    channel: {
      id: "ch1",
      name: "Blender Foundation",
      avatarUrl: "https://picsum.photos/seed/channel1/100/100",
      subscriberCount: 2500000,
    },
  },
  {
    id: "8",
    title: "Tears of Steel - Sci-Fi Epic",
    description:
      "Tears of Steel is a short science fiction film. It tells the story of a group of warriors and scientists trying to save the world from a robot apocalypse.",
    thumbnailUrl: "https://picsum.photos/seed/video8/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: 734,
    views: 1800000,
    likes: 95000,
    createdAt: "2025-11-10T14:30:00Z",
    channel: {
      id: "ch1",
      name: "Blender Foundation",
      avatarUrl: "https://picsum.photos/seed/channel1/100/100",
      subscriberCount: 2500000,
    },
  },
  {
    id: "9",
    title: "Gaming Setup Tour 2026",
    description:
      "Check out my ultimate gaming setup for 2026! From RGB lighting to high-refresh monitors, this setup has it all for the ultimate gaming experience.",
    thumbnailUrl: "https://picsum.photos/seed/video9/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: 13,
    views: 920000,
    likes: 67000,
    createdAt: "2026-01-20T11:00:00Z",
    channel: {
      id: "ch6",
      name: "Tech Reviews Daily",
      avatarUrl: "https://picsum.photos/seed/channel6/100/100",
      subscriberCount: 1850000,
    },
  },
  {
    id: "10",
    title: "Cooking with Fire - Grilled Perfection",
    description:
      "Learn the art of grilling with professional chef techniques. From the perfect sear to restaurant-quality presentation, master the flames.",
    thumbnailUrl: "https://picsum.photos/seed/video10/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    duration: 596,
    views: 680000,
    likes: 42000,
    createdAt: "2026-01-08T13:00:00Z",
    channel: {
      id: "ch7",
      name: "Culinary Masters",
      avatarUrl: "https://picsum.photos/seed/channel7/100/100",
      subscriberCount: 2100000,
    },
  },
  {
    id: "11",
    title: "Nature Documentary - Mountain Peaks",
    description:
      "Explore the breathtaking beauty of the world's highest mountain peaks. A visual journey through snow-capped summits and pristine wilderness.",
    thumbnailUrl: "https://picsum.photos/seed/video11/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    duration: 180,
    views: 1250000,
    likes: 89000,
    createdAt: "2025-12-01T07:00:00Z",
    channel: {
      id: "ch8",
      name: "Nature Explorer",
      avatarUrl: "https://picsum.photos/seed/channel8/100/100",
      subscriberCount: 4200000,
    },
  },
  {
    id: "12",
    title: "Music Production Tutorial - Beat Making",
    description:
      "Learn how to create professional beats from scratch. This comprehensive tutorial covers everything from drum patterns to mixing techniques.",
    thumbnailUrl: "https://picsum.photos/seed/video12/640/360",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    duration: 114,
    views: 430000,
    likes: 28000,
    createdAt: "2026-01-25T15:00:00Z",
    channel: {
      id: "ch9",
      name: "Beat Academy",
      avatarUrl: "https://picsum.photos/seed/channel9/100/100",
      subscriberCount: 680000,
    },
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    content:
      "This video was incredibly helpful! I've been struggling with this for months, and after applying these techniques, I've already seen a noticeable improvement.",
    author: {
      id: "u1",
      name: "GameMaster",
      avatarUrl: "https://picsum.photos/seed/user1/100/100",
    },
    likes: 245,
    dislikes: 2,
    createdAt: "2026-01-10T10:00:00Z",
    replies: [
      {
        id: "c3",
        content: "Couldn't agree more! This is a game-changer.",
        author: {
          id: "u3",
          name: "NewbiePlayer",
          avatarUrl: "https://picsum.photos/seed/user3/100/100",
        },
        likes: 56,
        dislikes: 1,
        createdAt: "2026-01-10T11:30:00Z",
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    content:
      "Great content as always! One thing I'd add is that different approaches work for different people, so experiment to find what works best for you.",
    author: {
      id: "u2",
      name: "ProGamer123",
      avatarUrl: "https://picsum.photos/seed/user2/100/100",
    },
    likes: 189,
    dislikes: 5,
    createdAt: "2026-01-05T15:30:00Z",
    replies: [],
  },
  {
    id: "c4",
    content:
      "I watched this at 3 AM and now I can't stop thinking about it. The quality is just incredible!",
    author: {
      id: "u4",
      name: "NightOwl",
      avatarUrl: "https://picsum.photos/seed/user4/100/100",
    },
    likes: 78,
    dislikes: 0,
    createdAt: "2026-01-08T03:00:00Z",
    replies: [],
  },
  {
    id: "c5",
    content:
      "The production quality keeps getting better. Can you do a behind-the-scenes video sometime?",
    author: {
      id: "u5",
      name: "ContentCreator",
      avatarUrl: "https://picsum.photos/seed/user5/100/100",
    },
    likes: 134,
    dislikes: 3,
    createdAt: "2026-01-12T09:15:00Z",
    replies: [
      {
        id: "c6",
        content: "Yes please! Would love to see the setup!",
        author: {
          id: "u6",
          name: "TechEnthusiast",
          avatarUrl: "https://picsum.photos/seed/user6/100/100",
        },
        likes: 23,
        dislikes: 0,
        createdAt: "2026-01-12T10:00:00Z",
        replies: [],
      },
    ],
  },
];

// Helper functions to get different video categories
export function getTrendingVideos(): Video[] {
  return [...mockVideos].sort((a, b) => b.views - a.views).slice(0, 4);
}

export function getNewReleases(): Video[] {
  return [...mockVideos]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);
}

export function getRecommendedVideos(): Video[] {
  return [...mockVideos].sort((a, b) => b.likes - a.likes).slice(0, 4);
}

export function getVideoById(id: string): Video | undefined {
  return mockVideos.find((video) => video.id === id);
}

export function getRelatedVideos(currentVideoId: string): Video[] {
  return mockVideos.filter((video) => video.id !== currentVideoId).slice(0, 8);
}
