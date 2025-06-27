export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_url: string;
  published_at: Date;
  views: number;
  likes: number;
  trending?: boolean;
  slug: string;
  tags: string[];
  channel: {
    name: string;
    avatar: string;
  };
} 