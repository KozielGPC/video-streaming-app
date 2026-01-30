import type { ReactElement } from "react";
import type { Streamer } from "@/types";

interface StreamersSidebarProps {
  streamers: Streamer[];
  onStreamerClick?: (streamer: Streamer) => void;
}

function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

export function StreamersSidebar({
  streamers,
  onStreamerClick,
}: StreamersSidebarProps): ReactElement {
  const onlineStreamers = streamers.filter((s) => s.isLive);
  const offlineStreamers = streamers.filter((s) => !s.isLive);

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--card))] border-r border-[hsl(var(--border))]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[hsl(var(--border))]">
        <h2 className="font-semibold text-[hsl(var(--foreground))] text-sm uppercase tracking-wide">
          Followed Channels
        </h2>
      </div>

      {/* Streamers List */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Streamers */}
        {onlineStreamers.length > 0 && (
          <div className="py-2">
            {onlineStreamers.map((streamer) => (
              <button
                key={streamer.id}
                onClick={() => onStreamerClick?.(streamer)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[hsl(var(--muted))] transition-colors text-left"
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={streamer.avatarUrl}
                    alt={streamer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[hsl(var(--card))] rounded-full" />
                </div>

                {/* Name and status */}
                <div className="flex-1 min-w-0">
                  <p className="text-[hsl(var(--foreground))] text-sm font-medium truncate">
                    {streamer.name}
                  </p>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs">
                    {formatFollowerCount(streamer.followerCount)} followers
                  </p>
                </div>

                {/* Live indicator */}
                <span className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        {onlineStreamers.length > 0 && offlineStreamers.length > 0 && (
          <div className="px-4 py-2">
            <div className="border-t border-[hsl(var(--border))]" />
          </div>
        )}

        {/* Offline Streamers */}
        {offlineStreamers.length > 0 && (
          <div className="py-2">
            <p className="px-4 py-1 text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wide">
              Offline
            </p>
            {offlineStreamers.map((streamer) => (
              <button
                key={streamer.id}
                onClick={() => onStreamerClick?.(streamer)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[hsl(var(--muted))] transition-colors text-left opacity-60"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={streamer.avatarUrl}
                    alt={streamer.name}
                    className="w-8 h-8 rounded-full grayscale"
                  />
                </div>

                {/* Name and status */}
                <div className="flex-1 min-w-0">
                  <p className="text-[hsl(var(--foreground))] text-sm font-medium truncate">
                    {streamer.name}
                  </p>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs">
                    Offline
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {streamers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-[hsl(var(--muted-foreground))] mb-3"
            >
              <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.152-.177a1.56 1.56 0 001.11-.71l.821-1.317a2.926 2.926 0 012.332-1.39zM12 12.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              No channels followed yet
            </p>
            <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">
              Follow streamers to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
