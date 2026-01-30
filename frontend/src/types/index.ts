export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  createdAt: string;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  avatarUrl: string;
  subscriberCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  likes: number;
  dislikes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface LiveStream {
  id: string;
  title: string;
  thumbnailUrl: string;
  streamUrl: string;
  viewerCount: number;
  startedAt: string;
  streamer: Streamer;
  category: string;
  tags: string[];
}

export interface Streamer {
  id: string;
  name: string;
  avatarUrl: string;
  followerCount: number;
  isLive: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    badges?: string[];
  };
  timestamp: string;
}
