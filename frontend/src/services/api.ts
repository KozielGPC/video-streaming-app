import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { Video, Comment, LiveStream } from '@/types';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const LIVESTREAM_URL = import.meta.env.VITE_LIVESTREAM_URL || 'http://localhost:8001';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      if (status === 401) {
        // Handle unauthorized - could redirect to login
        console.error('Unauthorized request - please log in');
      } else if (status === 403) {
        console.error('Forbidden - insufficient permissions');
      } else if (status === 404) {
        console.error('Resource not found');
      } else if (status >= 500) {
        console.error('Server error - please try again later');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - please check your connection');
    } else {
      // Error setting up request
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// ============ Video API ============

/**
 * Fetch all videos
 */
export async function getVideos(): Promise<Video[]> {
  const response = await apiClient.get<Video[]>('/videos');
  return response.data;
}

/**
 * Fetch a single video by ID
 */
export async function getVideo(id: string): Promise<Video> {
  const response = await apiClient.get<Video>(`/videos/${id}`);
  return response.data;
}

/**
 * Like a video
 */
export async function likeVideo(id: string): Promise<void> {
  await apiClient.post(`/videos/${id}/like`);
}

/**
 * Fetch comments for a video
 */
export async function getVideoComments(id: string): Promise<Comment[]> {
  const response = await apiClient.get<Comment[]>(`/videos/${id}/comments`);
  return response.data;
}

// ============ Livestream API ============

/**
 * Fetch all active livestreams
 */
export async function getStreams(): Promise<LiveStream[]> {
  const response = await apiClient.get<LiveStream[]>('/streams');
  return response.data;
}

/**
 * Fetch a single livestream by ID
 */
export async function getStream(id: string): Promise<LiveStream> {
  const response = await apiClient.get<LiveStream>(`/streams/${id}`);
  return response.data;
}

// ============ Livestream Playback ============

/**
 * Check if we're in development mode
 * In dev, we use the Vite proxy to avoid CORS issues
 */
const isDevelopment = import.meta.env.DEV;

/**
 * Build the HLS stream URL for a given stream name
 * Uses the Vite proxy in development to avoid CORS issues
 * @param streamName - The name of the stream (e.g., "primeiralive")
 * @returns The full HLS playlist URL
 */
export function buildHlsStreamUrl(streamName: string): string {
  if (isDevelopment) {
    // Use Vite proxy in development: /hls/streamName/... -> localhost:8001/live/streamName/...
    return `/hls/${streamName}/index.m3u8`;
  }
  return `${LIVESTREAM_URL}/live/${streamName}/index.m3u8`;
}

/**
 * Check if a stream is currently live by checking the HLS playlist
 * Uses GET instead of HEAD because the playback server doesn't support HEAD
 * @param streamName - The name of the stream
 * @returns true if the stream is live (HLS playlist is available)
 */
export async function checkStreamLive(streamName: string): Promise<boolean> {
  try {
    const url = buildHlsStreamUrl(streamName);
    console.log('Checking stream availability:', url);
    // Use GET with abort controller to minimize data transfer
    const controller = new AbortController();
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });
    // Abort after getting status to avoid downloading the full playlist
    controller.abort();
    console.log('Stream check response:', response.status, response.ok);
    return response.ok;
  } catch (err) {
    // AbortError is expected when we abort the request
    if (err instanceof Error && err.name === 'AbortError') {
      return true; // If we got far enough to abort, stream exists
    }
    console.error('Stream check failed:', err);
    return false;
  }
}

/**
 * Get the livestream playback base URL
 */
export function getLivestreamBaseUrl(): string {
  if (isDevelopment) {
    return '/hls';
  }
  return LIVESTREAM_URL;
}

// Export the api client for custom requests if needed
export { apiClient };
