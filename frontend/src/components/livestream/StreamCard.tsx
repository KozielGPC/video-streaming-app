import type { ReactElement } from "react";
import type { LiveStream } from "@/types";

interface StreamCardProps {
  stream: LiveStream;
  onClick: (stream: LiveStream) => void;
}

function formatViewerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

function getStreamDuration(startedAt: string): string {
  const start = new Date(startedAt);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`;
  }
  return `${diffMinutes}m`;
}

export function StreamCard({ stream, onClick }: StreamCardProps): ReactElement {
  return (
    <div
      onClick={() => onClick(stream)}
      className="group cursor-pointer rounded-lg overflow-hidden bg-[hsl(var(--card))] border border-[hsl(var(--border))] transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={stream.thumbnailUrl}
          alt={stream.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* LIVE Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
          <span className="text-white text-xs font-semibold uppercase">
            Live
          </span>
        </div>

        {/* Viewer Count */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-red-500"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white text-xs font-medium">
            {formatViewerCount(stream.viewerCount)}
          </span>
        </div>

        {/* Stream Duration */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-white text-xs font-medium">
            {getStreamDuration(stream.startedAt)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex gap-3">
          {/* Streamer Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={stream.streamer.avatarUrl}
              alt={stream.streamer.name}
              className="w-10 h-10 rounded-full border-2 border-purple-500/50"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[hsl(var(--card))] rounded-full" />
          </div>

          {/* Stream Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm line-clamp-1 group-hover:text-purple-400 transition-colors">
              {stream.title}
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mt-0.5">
              {stream.streamer.name}
            </p>
            <p className="text-[hsl(var(--muted-foreground))] text-xs mt-0.5">
              {stream.category}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {stream.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-2 py-0.5 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
