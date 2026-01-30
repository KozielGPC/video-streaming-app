import { useState, useEffect, useCallback } from 'react';
import type { LiveStream } from '@/types';
import { getStreams, getStream, buildHlsStreamUrl, checkStreamLive } from '@/services/api';

// Mock data for development/fallback
// Uses real HLS test streams for development
const mockStreams: LiveStream[] = [
  {
    id: 'stream1',
    title: 'Live Coding: Building a Real-time Chat App',
    thumbnailUrl: 'https://picsum.photos/seed/stream1/640/360',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    viewerCount: 1250,
    startedAt: '2026-01-30T14:00:00Z',
    streamer: {
      id: 's1',
      name: 'CodeWithMe',
      avatarUrl: 'https://picsum.photos/seed/streamer1/100/100',
      followerCount: 45000,
      isLive: true,
    },
    category: 'Programming',
    tags: ['typescript', 'nodejs', 'websockets'],
  },
  {
    id: 'stream2',
    title: 'Retro Gaming Night - Super Mario Bros 3',
    thumbnailUrl: 'https://picsum.photos/seed/stream2/640/360',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    viewerCount: 3400,
    startedAt: '2026-01-30T12:30:00Z',
    streamer: {
      id: 's2',
      name: 'RetroGamer88',
      avatarUrl: 'https://picsum.photos/seed/streamer2/100/100',
      followerCount: 125000,
      isLive: true,
    },
    category: 'Gaming',
    tags: ['retro', 'nintendo', 'mario'],
  },
  {
    id: 'stream3',
    title: 'Music Production: Making Lo-Fi Beats',
    thumbnailUrl: 'https://picsum.photos/seed/stream3/640/360',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    viewerCount: 890,
    startedAt: '2026-01-30T15:45:00Z',
    streamer: {
      id: 's3',
      name: 'BeatMakerPro',
      avatarUrl: 'https://picsum.photos/seed/streamer3/100/100',
      followerCount: 32000,
      isLive: true,
    },
    category: 'Music',
    tags: ['lofi', 'production', 'ableton'],
  },
  {
    id: 'stream4',
    title: 'Kubernetes Deep Dive - Deploying Microservices',
    thumbnailUrl: 'https://picsum.photos/seed/stream4/640/360',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    viewerCount: 678,
    startedAt: '2026-01-30T16:00:00Z',
    streamer: {
      id: 's4',
      name: 'DevOpsDaily',
      avatarUrl: 'https://picsum.photos/seed/streamer4/100/100',
      followerCount: 78000,
      isLive: true,
    },
    category: 'Technology',
    tags: ['kubernetes', 'devops', 'docker'],
  },
];

/**
 * Build stream URL from stream name using the backend playback service
 * Falls back to the provided streamUrl if the backend stream is not available
 */
export function useStreamUrl(streamName: string, fallbackUrl?: string): {
  streamUrl: string;
  isLive: boolean;
  isChecking: boolean;
} {
  const [isLive, setIsLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!streamName) {
      setIsChecking(false);
      return;
    }

    const checkLive = async () => {
      setIsChecking(true);
      const live = await checkStreamLive(streamName);
      setIsLive(live);
      setIsChecking(false);
    };

    checkLive();
  }, [streamName]);

  const streamUrl = isLive 
    ? buildHlsStreamUrl(streamName) 
    : (fallbackUrl || 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');

  return { streamUrl, isLive, isChecking };
}

interface UseStreamsResult {
  streams: LiveStream[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch all active livestreams
 */
export function useStreams(): UseStreamsResult {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStreams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getStreams();
      setStreams(data);
    } catch (err) {
      console.warn('Failed to fetch streams, using mock data:', err);
      setStreams(mockStreams);
      setError(err instanceof Error ? err : new Error('Failed to fetch streams'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return { streams, isLoading, error, refetch: fetchStreams };
}

interface UseStreamResult {
  stream: LiveStream | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch a single livestream by ID
 */
export function useStream(id: string): UseStreamResult {
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchStream = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getStream(id);
        setStream(data);
      } catch (err) {
        console.warn('Failed to fetch stream, using mock data:', err);
        // Fallback to mock data
        const mockStream = mockStreams.find(s => s.id === id) || mockStreams[0];
        setStream(mockStream);
        setError(err instanceof Error ? err : new Error('Failed to fetch stream'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStream();
  }, [id]);

  return { stream, isLoading, error };
}
