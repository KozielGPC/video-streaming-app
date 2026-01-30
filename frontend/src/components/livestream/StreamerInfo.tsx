import type { ReactElement } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Streamer } from "@/types";

interface StreamerInfoProps {
  streamer: Streamer;
  category?: string;
  tags?: string[];
  title?: string;
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

export function StreamerInfo({
  streamer,
  category,
  tags,
  title,
}: StreamerInfoProps): ReactElement {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={streamer.avatarUrl}
            alt={streamer.name}
            className="w-16 h-16 rounded-full border-2 border-purple-500"
          />
          {streamer.isLive && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
              Live
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
              {streamer.name}
            </h2>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={cn(
                "px-4 py-1.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2",
                isFollowing
                  ? "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-red-600/20 hover:text-red-400"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              )}
            >
              {isFollowing ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Following
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Follow
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[hsl(var(--muted-foreground))] text-sm">
            <span>{formatFollowerCount(streamer.followerCount)} followers</span>
          </div>

          {title && (
            <p className="mt-2 text-[hsl(var(--foreground))] text-sm line-clamp-2">
              {title}
            </p>
          )}

          {/* Category and Tags */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {category && (
              <span className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] px-2.5 py-1 rounded-full text-xs font-medium">
                {category}
              </span>
            )}
            {tags?.map((tag) => (
              <span
                key={tag}
                className="bg-purple-600/20 text-purple-400 px-2.5 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
