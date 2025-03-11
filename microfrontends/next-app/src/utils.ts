import { VideoModel } from "./app/types/video";

export function getMockedVideos(): VideoModel[] {
    const mockData: VideoModel[] = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        title: `Sample Video Title ${index + 1}`,
        description: `This is a description for Sample Video ${index + 1}. It provides an overview of the video's content.`,
        thumbnail: `https://placehold.co/150/png`,
        slug: `sample-video-${index + 1}`,
        published_at: new Date(Date.now() - index * 100000000).toISOString(), // staggered publish dates
        likes: Math.floor(Math.random() * 1000),
        views: Math.floor(Math.random() * 10000),
        tags: [`tag${index + 1}`, `category${index % 3}`],
        video_url: `https://example.com/videos/sample-video-${index + 1}.mp4`
    }));

    return mockData;
}
