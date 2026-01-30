import { useState, useEffect, useCallback } from 'react';
import type { Video, Comment } from '@/types';
import { getVideos, getVideo, likeVideo as likeVideoApi, getVideoComments } from '@/services/api';

// Mock data for development/fallback
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    description: 'Learn the new features in React 19 including the new compiler and server components.',
    thumbnailUrl: 'https://picsum.photos/seed/react19/640/360',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 1245,
    views: 125000,
    likes: 8500,
    createdAt: '2026-01-15T10:30:00Z',
    channel: {
      id: 'ch1',
      name: 'Tech Tutorials',
      avatarUrl: 'https://picsum.photos/seed/tech/100/100',
      subscriberCount: 250000,
    },
  },
  {
    id: '2',
    title: 'Building Scalable Microservices with Go',
    description: 'A deep dive into building production-ready microservices using Go.',
    thumbnailUrl: 'https://picsum.photos/seed/golang/640/360',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 2456,
    views: 89000,
    likes: 6200,
    createdAt: '2026-01-20T14:00:00Z',
    channel: {
      id: 'ch2',
      name: 'Backend Masters',
      avatarUrl: 'https://picsum.photos/seed/backend/100/100',
      subscriberCount: 180000,
    },
  },
  {
    id: '3',
    title: 'TypeScript Best Practices 2026',
    description: 'Essential TypeScript patterns and practices for modern development.',
    thumbnailUrl: 'https://picsum.photos/seed/typescript/640/360',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 1890,
    views: 67000,
    likes: 4800,
    createdAt: '2026-01-25T09:15:00Z',
    channel: {
      id: 'ch3',
      name: 'Code Quality',
      avatarUrl: 'https://picsum.photos/seed/quality/100/100',
      subscriberCount: 95000,
    },
  },
];

const mockComments: Comment[] = [
  {
    id: 'c1',
    content: 'Great tutorial! Really helped me understand the concepts.',
    author: {
      id: 'u1',
      name: 'DevUser123',
      avatarUrl: 'https://picsum.photos/seed/user1/50/50',
    },
    likes: 45,
    dislikes: 2,
    createdAt: '2026-01-16T08:30:00Z',
    replies: [
      {
        id: 'c1r1',
        content: 'Agreed! The examples were very clear.',
        author: {
          id: 'u2',
          name: 'ReactFan',
          avatarUrl: 'https://picsum.photos/seed/user2/50/50',
        },
        likes: 12,
        dislikes: 0,
        createdAt: '2026-01-16T09:15:00Z',
      },
    ],
  },
  {
    id: 'c2',
    content: 'Can you do a follow-up video on server components?',
    author: {
      id: 'u3',
      name: 'FullStackDev',
      avatarUrl: 'https://picsum.photos/seed/user3/50/50',
    },
    likes: 28,
    dislikes: 1,
    createdAt: '2026-01-17T14:20:00Z',
  },
];

interface UseVideosResult {
  videos: Video[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch all videos
 */
export function useVideos(): UseVideosResult {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (err) {
      console.warn('Failed to fetch videos, using mock data:', err);
      setVideos(mockVideos);
      setError(err instanceof Error ? err : new Error('Failed to fetch videos'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, isLoading, error, refetch: fetchVideos };
}

interface UseVideoResult {
  video: Video | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch a single video by ID
 */
export function useVideo(id: string): UseVideoResult {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchVideo = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getVideo(id);
        setVideo(data);
      } catch (err) {
        console.warn('Failed to fetch video, using mock data:', err);
        // Fallback to mock data
        const mockVideo = mockVideos.find(v => v.id === id) || mockVideos[0];
        setVideo(mockVideo);
        setError(err instanceof Error ? err : new Error('Failed to fetch video'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  return { video, isLoading, error };
}

interface UseVideoCommentsResult {
  comments: Comment[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch comments for a video
 */
export function useVideoComments(videoId: string): UseVideoCommentsResult {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    if (!videoId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getVideoComments(videoId);
      setComments(data);
    } catch (err) {
      console.warn('Failed to fetch comments, using mock data:', err);
      setComments(mockComments);
      setError(err instanceof Error ? err : new Error('Failed to fetch comments'));
    } finally {
      setIsLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, isLoading, error, refetch: fetchComments };
}

interface UseLikeVideoResult {
  likeVideo: (id: string) => Promise<void>;
  isLiking: boolean;
  error: Error | null;
}

/**
 * Hook to like a video
 */
export function useLikeVideo(): UseLikeVideoResult {
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const likeVideo = useCallback(async (id: string) => {
    setIsLiking(true);
    setError(null);
    
    try {
      await likeVideoApi(id);
    } catch (err) {
      console.warn('Failed to like video:', err);
      setError(err instanceof Error ? err : new Error('Failed to like video'));
      // Re-throw so component can handle
      throw err;
    } finally {
      setIsLiking(false);
    }
  }, []);

  return { likeVideo, isLiking, error };
}
