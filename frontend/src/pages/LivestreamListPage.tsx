import type { ReactElement } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { StreamCard } from "@/components/livestream/StreamCard";
import { StreamersSidebar } from "@/components/livestream/StreamersSidebar";
import {
  mockLiveStreams,
  mockStreamers,
  categories,
} from "@/mocks/livestreams";
import type { LiveStream, Streamer } from "@/types";

export function LivestreamListPage(): ReactElement {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStreams =
    selectedCategory === "All"
      ? mockLiveStreams
      : mockLiveStreams.filter(
          (stream) => stream.category === selectedCategory
        );

  const handleStreamClick = (stream: LiveStream) => {
    navigate(`/live/${stream.id}`);
  };

  const handleStreamerClick = (streamer: Streamer) => {
    // Find a live stream from this streamer
    const stream = mockLiveStreams.find((s) => s.streamer.id === streamer.id);
    if (stream) {
      navigate(`/live/${stream.id}`);
    }
  };

  return (
    <div className="flex h-full">
      {/* Streamers Sidebar */}
      <div className="hidden lg:block w-60 flex-shrink-0">
        <StreamersSidebar
          streamers={mockStreamers}
          onStreamerClick={handleStreamerClick}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
              Live Channels
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] mt-1">
              Watch live streams from your favorite creators
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[hsl(var(--muted))]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Stream Count */}
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[hsl(var(--muted-foreground))] text-sm">
              {filteredStreams.length} streams live
            </span>
          </div>

          {/* Streams Grid */}
          {filteredStreams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStreams.map((stream) => (
                <StreamCard
                  key={stream.id}
                  stream={stream}
                  onClick={handleStreamClick}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-[hsl(var(--muted-foreground))] mb-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                No streams found
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">
                No one is streaming in the "{selectedCategory}" category right
                now.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                View all streams
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
