import type { ReactElement } from "react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LivePlayer } from "@/components/livestream/LivePlayer";
import { LiveChat } from "@/components/livestream/LiveChat";
import { StreamerInfo } from "@/components/livestream/StreamerInfo";
import { mockLiveStreams, mockChatMessages } from "@/mocks/livestreams";
import { useChat } from "@/hooks/useChat";
import { buildHlsStreamUrl, checkStreamLive } from "@/services/api";
import type { ChatMessage, LiveStream } from "@/types";

export function LivestreamPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for backend stream
  const [backendStream, setBackendStream] = useState<LiveStream | null>(null);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  // Find the stream in mock data first
  const mockStream = useMemo(
    () => mockLiveStreams.find((s) => s.id === id),
    [id]
  );

  // Check backend for real stream if not found in mock data
  useEffect(() => {
    if (mockStream || !id) {
      setBackendStream(null);
      return;
    }

    const checkBackendStream = async () => {
      setIsCheckingBackend(true);
      setBackendError(null);

      try {
        // Check if the stream is live on the backend
        const isLive = await checkStreamLive(id);
        
        if (isLive) {
          // Create a stream object for the backend stream
          const stream: LiveStream = {
            id: id,
            title: `Live Stream: ${id}`,
            thumbnailUrl: `https://picsum.photos/seed/${id}/640/360`,
            streamUrl: buildHlsStreamUrl(id),
            viewerCount: 0,
            startedAt: new Date().toISOString(),
            streamer: {
              id: `streamer-${id}`,
              name: id,
              avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
              followerCount: 0,
              isLive: true,
            },
            category: "Live",
            tags: ["live", "streaming"],
          };
          setBackendStream(stream);
        } else {
          setBackendError("Stream is not currently live");
        }
      } catch (err) {
        console.error("Error checking backend stream:", err);
        setBackendError("Failed to connect to stream server");
      } finally {
        setIsCheckingBackend(false);
      }
    };

    checkBackendStream();
  }, [id, mockStream]);

  // Use mock stream or backend stream
  const stream = mockStream || backendStream;

  // Real-time chat connection using the chat-service backend
  const { 
    messages: liveMessages, 
    sendMessage: sendLiveMessage, 
    isConnected,
    error: chatError 
  } = useChat(id || "", "Viewer");

  // Local messages state (fallback + initial mock messages when using mock stream)
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(
    mockStream ? mockChatMessages : []
  );
  
  // Combine mock messages with live messages from the backend
  const allMessages = useMemo(() => {
    return [...localMessages, ...liveMessages];
  }, [localMessages, liveMessages]);

  // Log chat connection status
  useEffect(() => {
    if (isConnected) {
      console.log("Connected to chat service for stream:", id);
    }
    if (chatError) {
      console.warn("Chat connection error:", chatError.message);
    }
  }, [isConnected, chatError, id]);

  // Handle sending a message
  const handleSendMessage = useCallback((content: string) => {
    if (isConnected) {
      // Send via real-time socket connection
      sendLiveMessage(content);
    } else {
      // Fallback to local state if not connected
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        content,
        author: {
          id: "current-user",
          name: "You",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
          badges: ["subscriber"],
        },
        timestamp: new Date().toISOString(),
      };
      setLocalMessages((prev) => [...prev, newMessage]);
    }
  }, [isConnected, sendLiveMessage]);

  // Show loading state while checking backend
  if (isCheckingBackend) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[hsl(var(--muted-foreground))]">
          Checking stream availability...
        </p>
      </div>
    );
  }

  // Handle not found
  if (!stream) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-16 h-16 text-[hsl(var(--muted-foreground))] mb-4"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
          Stream Not Found
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] mb-4">
          {backendError || "The stream you're looking for doesn't exist or has ended."}
        </p>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
          Stream ID: <code className="bg-[hsl(var(--muted))] px-2 py-1 rounded">{id}</code>
        </p>
        <button
          onClick={() => navigate("/live")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors"
        >
          Browse Live Streams
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Content - Player and Streamer Info */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player */}
        <div className="flex-shrink-0 bg-black">
          <div className="max-w-[1600px] mx-auto">
            <LivePlayer
              streamUrl={stream.streamUrl}
              posterUrl={stream.thumbnailUrl}
              viewerCount={stream.viewerCount}
            />
          </div>
        </div>

        {/* Streamer Info - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-[1600px] mx-auto">
            <StreamerInfo
              streamer={stream.streamer}
              category={stream.category}
              tags={stream.tags}
              title={stream.title}
            />

            {/* Additional content area */}
            <div className="mt-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">
                  About this stream
                </h3>
                {backendStream && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs font-medium rounded">
                    Backend Stream
                  </span>
                )}
              </div>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                {stream.title}
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{stream.viewerCount.toLocaleString()} viewers</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Started{" "}
                    {new Date(stream.startedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar - Fixed width */}
      <div className="hidden md:block w-[350px] flex-shrink-0 border-l border-[hsl(var(--border))]">
        <div className="h-full flex flex-col">
          {/* Connection status indicator */}
          {!isConnected && (
            <div className="px-3 py-1 bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-500 text-xs text-center">
              {chatError ? "Chat offline - using local mode" : "Connecting to chat..."}
            </div>
          )}
          <div className="flex-1">
            <LiveChat messages={allMessages} onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>

      {/* Mobile Chat Toggle Button */}
      <button
        className="md:hidden fixed bottom-4 right-4 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
