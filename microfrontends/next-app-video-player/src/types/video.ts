export type VideoModel = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    slug: string;
    published_at: string;
    likes: number;
    views: number;
    tags: string[];
    channel: {
        name: string;
        avatar: string;
    };
    video_url: string;
}